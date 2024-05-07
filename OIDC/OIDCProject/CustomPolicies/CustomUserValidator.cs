using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Identity;

namespace OIDCProject.CustomPolicies;

public partial class CustomUserValidator : IUserValidator<IdentityUser>
{
    private readonly int _minLength = 8;

    public Task<IdentityResult> ValidateAsync(UserManager<IdentityUser> manager, IdentityUser user)
    {
        if (string.IsNullOrWhiteSpace(user.UserName) || user.UserName.Length < _minLength)
            return Task.FromResult(IdentityResult.Failed(new IdentityError
            {
                Code = "400",
                Description = $"Username is too short! Min length is {_minLength}."
            }));
        
        const string allowedPattern = "[a-z]";
        var regex = MyRegex();

        foreach (var character in user.UserName)
        {
            if (!regex.IsMatch(character.ToString()))
                return Task.FromResult(IdentityResult.Failed(new IdentityError
                {
                    Code = "400",
                    Description = "Username can only contain lowercase letters!"
                }));
        }

        return Task.FromResult(IdentityResult.Success);
    }

    [GeneratedRegex("[a-z]")]
    private static partial Regex MyRegex();
}