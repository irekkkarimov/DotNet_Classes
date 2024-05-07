namespace OIDCProject.Services;

public interface IEmailSender
{
    Task SendConfirmEmailAsync(string email, string code);
}