using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Identity;

namespace OIDCProject.CustomPolicies;

public partial class CustomPasswordValidator : IPasswordValidator<IdentityUser>
{
    private readonly int _minLength = 8;

    public Task<IdentityResult> ValidateAsync(UserManager<IdentityUser> manager, IdentityUser user, string? password)
    {
        if (string.IsNullOrWhiteSpace(password) || password.Length < _minLength)
            return Task.FromResult(
                IdentityResult.Failed(new IdentityError
                {
                    Code = "400",
                    Description = $"Password is too short! Minimum password length is {_minLength}."
                }));

        const string allowedPattern = @"[0-9!@#$%^&*\(\)_\+\-\={}<>,\.\|""'~`:;\\?\/\[\]]";
        var regex = MyRegex();

        foreach (var character in password)
            if (!regex.IsMatch(character.ToString()))
                return Task.FromResult(IdentityResult.Failed(new IdentityError
                {
                    Code = "400",
                    Description = "Password can only contain number and special characters!"
                }));

        return Task.FromResult(IdentityResult.Success);
    }

    [GeneratedRegex("[0-9!@#$%^&*\\(\\)_\\+\\-\\={}<>,\\.\\|\"'~`:;\\\\?\\/\\[\\]]")]
    private static partial Regex MyRegex();
}