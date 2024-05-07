namespace OIDCProject.DTOs.Identity;

public class EmailConfirmRequest
{
    public string Email { get; set; } = null!;
    public string ConfirmationCode { get; set; } = null!;
}