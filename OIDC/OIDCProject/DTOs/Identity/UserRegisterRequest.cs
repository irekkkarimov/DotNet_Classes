namespace OIDCProject.DTOs.Identity;

public class UserRegisterRequest
{
    public string Email { get; set; } = null!;
    public string Username { get; set; } = null!;
    public string Password { get; set; } = null!;
}