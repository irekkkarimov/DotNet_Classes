using MailKit.Net.Smtp;
using MimeKit;

namespace OIDCProject.Services;

public class EmailSender : IEmailSender
{
    public async Task SendConfirmEmailAsync(string email, string code)
    {
        using var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress("Dotnet Email Confirm", "neiireksmt@yandex.ru"));
        emailMessage.To.Add(new MailboxAddress("", email));

        var bodyBuilder = new BodyBuilder
        {
            TextBody = $"Your confirmation code: {code}"
        };
        var body = bodyBuilder.ToMessageBody();
        emailMessage.Body = body;

        using var client = new SmtpClient();

        await client.ConnectAsync("smtp.yandex.ru", 587);
        await client.AuthenticateAsync("neiireksmt@yandex.ru", "xqbivlheyyastnbi");
        await client.SendAsync(emailMessage);
        await client.DisconnectAsync(true);
    }
}