using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuthProject.Controllers;

[Route("[controller]/[action]")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    [HttpGet]
    public IActionResult GetInfo()
    {
        var email = HttpContext.User.Claims.FirstOrDefault(i => i.Type.Equals(ClaimTypes.Email));
        return Ok($"Hello, user '{email?.Value}' is admin");
    }
}