using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace OIDCProject.Controllers;

[Authorize]
[Route("[controller]/[action]")]
public class PrivateController : ControllerBase
{
    [HttpGet]
    public IActionResult GetPrivateInfo()
    {
        var userEmail = HttpContext.User.Claims.FirstOrDefault(i => i.Type.Equals(ClaimTypes.Email))!.Value;
        return Ok($"Вы авторизованы под почтой: {userEmail}");
    }
}