using System.IdentityModel.Tokens.Jwt;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OIDCProject.Contexts;
using OIDCProject.DTOs;
using OIDCProject.Model;

namespace OIDCProject.Controllers;

[Route("[controller]/[action]")]
public class OAuth2Controller : ControllerBase
{
    private readonly AppDbContext _dbContext;
    private readonly IConfiguration _configuration;
    private readonly HttpClient _httpClient = new();

    public OAuth2Controller(IConfiguration configuration, AppDbContext dbContext)
    {
        _configuration = configuration;
        _dbContext = dbContext;
    }

    [HttpPost]
    public async Task<IActionResult> Auth([FromQuery] string codeGoogle, CancellationToken cancellationToken)
    {
        var contentForGoogle = new FormUrlEncodedContent(new KeyValuePair<string, string>[]
        {
            new("client_id", _configuration.GetSection("OAuth2:Google:ClientId").Value!),
            new("client_secret", _configuration.GetSection("OAuth2:Google:ClientSecret").Value!),
            new("redirect_uri", "http://localhost:3000/"),
            new("grant_type", "authorization_code"),
            new("code", codeGoogle)
        });

        var response = await _httpClient.PostAsync(GoogleDefaults.TokenEndpoint, contentForGoogle, cancellationToken);
        var stringResult = await response.Content.ReadAsStringAsync(cancellationToken);

        var googleGetToken = JsonSerializer.Deserialize<GoogleGetToken>(stringResult);
        var claims = new JwtSecurityTokenHandler().ReadJwtToken(googleGetToken!.IdToken).Claims;

        if (claims is null)
            throw new NullReferenceException("Claims from google identity token not found");

        var emailClaim = claims.FirstOrDefault(x => x.Type == "email");
        if (emailClaim is null)
            throw new NullReferenceException("Email claim not found");

        var tokenFromDb = await _dbContext.Tokens
            .FirstOrDefaultAsync(i => i.Email == emailClaim.Value, cancellationToken);

        if (googleGetToken.AccessToken is null)
            throw new NullReferenceException("Access token from google is null");

        if (googleGetToken.IdToken is null)
            throw new NullReferenceException("Identity token from google is null");

        if (googleGetToken.RefreshToken is null)
            throw new NullReferenceException("Refresh token from google is null");

        if (tokenFromDb is not null)
        {
            tokenFromDb.AccessToken = googleGetToken.AccessToken!;
            tokenFromDb.UpdateDate = DateTime.UtcNow;
            tokenFromDb.ExpiresIn = googleGetToken.ExpiresIn;
            tokenFromDb.RefreshToken = googleGetToken.RefreshToken;
            tokenFromDb.IdentityToken = googleGetToken.IdToken;
        }
        else
        {
            tokenFromDb = new Token
            {
                Id = Guid.NewGuid(),
                Email = emailClaim.Value,
                AccessToken = googleGetToken.AccessToken,
                ExpiresIn = googleGetToken.ExpiresIn,
                CreateDate = DateTime.UtcNow,
                UpdateDate = DateTime.UtcNow,
                IdentityToken = googleGetToken.IdToken,
                RefreshToken = googleGetToken.RefreshToken
            };

            await _dbContext.Tokens.AddAsync(tokenFromDb, cancellationToken);
        }

        await _dbContext.SaveChangesAsync(cancellationToken);

        return Ok(new AuthResponse
        {
            IdentityToken = tokenFromDb.IdentityToken,
            AccessToken = tokenFromDb.AccessToken
        });
    }

    [HttpPost]
    public async Task<IActionResult> Refresh([FromQuery] string accessToken,
        CancellationToken cancellationToken)
    {
        var token = await _dbContext.Tokens
            .FirstOrDefaultAsync(x =>
                x.AccessToken == accessToken, cancellationToken);

        if (token is null)
            return BadRequest("User not found");

        var content = new FormUrlEncodedContent(new KeyValuePair<string, string>[]
        {
            new("client_id", _configuration.GetSection("OAuth2:Google:ClientId").Value!),
            new("client_secret", _configuration.GetSection("OAuth2:Google:ClientSecret").Value!),
            new("refresh_token", token.RefreshToken),
            new("grant_type", "refresh_token"),
        });

        var response = await _httpClient.PostAsync(GoogleDefaults.TokenEndpoint, content, cancellationToken);
        var result =
            JsonSerializer.Deserialize<GoogleGetRefreshedToken>(
                await response.Content.ReadAsStringAsync(cancellationToken))!;

        token.AccessToken = result.AccessToken;
        token.ExpiresIn = result.ExpiresIn;
        token.UpdateDate = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);

        return Ok(new AuthResponse { AccessToken = result.AccessToken, IdentityToken = token.IdentityToken});
    }

    [HttpGet]
    public async Task<IActionResult> GetIdentityToken([FromQuery] string accessToken, CancellationToken cancellationToken)
    {
        var tokenFromDb = await _dbContext.Tokens
            .FirstOrDefaultAsync(i => i.AccessToken == accessToken, cancellationToken);

        if (tokenFromDb is null)
            throw new ArgumentException("User by this access token not found");
        
        return Ok(new AuthResponse
        {
            IdentityToken = tokenFromDb.IdentityToken,
            AccessToken = tokenFromDb.AccessToken
        });
    }
}