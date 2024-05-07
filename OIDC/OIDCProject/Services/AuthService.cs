using Microsoft.AspNetCore.Identity;
using OIDCProject.DTOs.Identity;

namespace OIDCProject.Services;

public class AuthService : IAuthService
{
    private readonly SignInManager<IdentityUser> _signInManager;

    public AuthService(SignInManager<IdentityUser> signInManager)
    {
        _signInManager = signInManager;
    }

    public async Task<(bool, string)> RegisterAsync(UserRegisterRequest request)
    {
        if (await _signInManager.UserManager.FindByEmailAsync(request.Email) is not null)
            return (false, "User already exists");
        
        var newUser = new IdentityUser
        {
            UserName = request.Username,
            Email = request.Email
        };

        var result = await _signInManager.UserManager.CreateAsync(newUser, request.Password);
        var confirmationCode = await _signInManager.UserManager.GenerateEmailConfirmationTokenAsync(newUser);

        return result.Succeeded
            ? (result.Succeeded, confirmationCode)
            : (result.Succeeded, result.Errors.FirstOrDefault()?.Description ?? "");
    }

    public async Task<bool> LoginAsync(UserLoginRequest request)
    {
        var user = await _signInManager.UserManager.FindByEmailAsync(request.Email);

        if (user is null)
            return false;

        if (!user.EmailConfirmed)
            return false;
        
        var result = await _signInManager.PasswordSignInAsync(user, request.Password, true, false);

        return result.Succeeded;
    }

    public async Task<bool> ConfirmEmailAsync(EmailConfirmRequest request)
    {
        var user = await _signInManager.UserManager.FindByEmailAsync(request.Email);

        if (user is null)
            return false;

        var result = await _signInManager.UserManager.ConfirmEmailAsync(user, request.ConfirmationCode);

        return result.Succeeded;
    }

    public async Task LogoutAsync()
    {
        await _signInManager.SignOutAsync();
    }
}