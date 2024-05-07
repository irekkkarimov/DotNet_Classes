namespace OIDCProject.Model;

public class Token
{
    public Guid Id { get; set; }
    public string? Email { get; set; }
    public string AccessToken { get; set; } = null!;
    public int ExpiresIn { get; set; }
    public DateTime CreateDate { get; set; }
    public DateTime UpdateDate { get; set; }
    public string IdentityToken { get; set; } = null!;
    public string RefreshToken { get; set; } = null!;
}