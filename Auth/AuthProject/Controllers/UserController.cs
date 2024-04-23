using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AuthProject.Dto;
using AuthProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace AuthProject.Controllers;

[Route("[controller]/[action]")]
public class UserController : ControllerBase
{
    private readonly IDictionary<string, User> _users;
    private readonly IConfiguration _configuration;

    public UserController(IDictionary<string, User> users, IConfiguration configuration)
    {
        _users = users;
        _configuration = configuration;
    }

    [HttpPost]
    public IActionResult Login([FromBody] UserLoginDto userLoginDto)
    {
        if (!_users.TryGetValue(userLoginDto.Email, out var user))
            return BadRequest("User not found");

        if (!user.Password.Equals(userLoginDto.Password)) 
            return Forbid("Wrong password");
        
        var jwtToken = GenerateToken(user);
        Response.Cookies.Append("Token", jwtToken, new CookieOptions
        {
            Expires = DateTimeOffset.UtcNow.AddDays(1)
        });
        return Ok();

    }

    [HttpPost]
    public IActionResult Register([FromBody] UserRegisterDto userRegisterDto)
    {
        if (_users.ContainsKey(userRegisterDto.Email))
            return BadRequest("Email is already used");

        var newUser = new User
        {
            Email = userRegisterDto.Email,
            Password = userRegisterDto.Password,
            Role = userRegisterDto.Role
        };
        
        _users.Add(newUser.Email, newUser);
        var jwtToken = GenerateToken(newUser);
        Response.Cookies.Append("Token", jwtToken, new CookieOptions
        {
            Expires = DateTimeOffset.UtcNow.AddDays(1)
        });
        return Ok();
    }

    [HttpGet]
    public IActionResult GetInfo()
    {
        var tokenCookie = HttpContext.Request.Cookies["Token"];

        Console.WriteLine(tokenCookie);
        var claims = HttpContext.User.Claims.ToList();

        Console.WriteLine(claims.Count);
        return Ok();
    }

    [NonAction]
    private string GenerateToken(User user)
    {
        var claims = new List<Claim>
        {
            new("email", user.Email),
            new("role", user.Role)
        };
        
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value!));
       
        var creds = new SigningCredentials(key, SecurityAlgorithms.Aes128CbcHmacSha256);
       
        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: creds
        );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);
        return jwt;
    }
}