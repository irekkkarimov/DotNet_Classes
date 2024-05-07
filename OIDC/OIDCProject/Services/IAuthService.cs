using OIDCProject.DTOs;
using OIDCProject.DTOs.Identity;

namespace OIDCProject.Services;

public interface IAuthService
{
    Task<(bool, string)> RegisterAsync(UserRegisterRequest request);
    Task<bool> LoginAsync(UserLoginRequest request);
    Task<bool> ConfirmEmailAsync(EmailConfirmRequest request);
    Task LogoutAsync();
}