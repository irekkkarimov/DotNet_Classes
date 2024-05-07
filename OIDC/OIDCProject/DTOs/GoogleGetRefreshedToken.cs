using System.Text.Json.Serialization;

namespace OIDCProject.DTOs;

public class GoogleGetRefreshedToken
{
    [JsonPropertyName("access_token")]
    public string AccessToken { get; set; } = null!;
    
    [JsonPropertyName("expires_in")]
    public int ExpiresIn { get; set; }
}