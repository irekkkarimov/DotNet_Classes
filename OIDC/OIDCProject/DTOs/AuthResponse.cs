namespace OIDCProject.DTOs;

public class AuthResponse
{
    public string IdentityToken { get; set; } = null!;
    public string AccessToken { get; set; } = null!;
}