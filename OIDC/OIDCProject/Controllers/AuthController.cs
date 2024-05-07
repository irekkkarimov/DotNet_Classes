using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OIDCProject.DTOs.Identity;
using OIDCProject.Services;

namespace OIDCProject.Controllers;

[Route("[controller]/[action]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IEmailSender _emailSender;

    public AuthController(IAuthService authService, IEmailSender emailSender)
    {
        _authService = authService;
        _emailSender = emailSender;
    }

    [HttpPost]
    public async Task<IActionResult> RegisterAsync([FromBody] UserRegisterRequest request)
    {
        var result = await _authService.RegisterAsync(request);

        if (!result.Item1) 
            return BadRequest($"Произошла ошибка: {result.Item2}");
        
        await _emailSender.SendConfirmEmailAsync(request.Email, result.Item2);
        return Ok("Вы успешно зарегистрировались! Подтвердите почту!");

    }

    [HttpPost]
    public async Task<IActionResult> LoginAsync([FromBody] UserLoginRequest request)
    {
        var result = await _authService.LoginAsync(request);

        return result
            ? Ok("Вы успешно авторизовались!")
            : BadRequest("Произошла ошибка!");
    }

    [HttpPatch]
    public async Task<IActionResult> ConfirmEmail([FromBody] EmailConfirmRequest request)
    {
        var result = await _authService.ConfirmEmailAsync(request);

        return result
            ? Ok("Вы успешно подтвердили почту!")
            : BadRequest("Произошла ошибка");
    }

    [HttpGet]
    public async Task LogoutAsync()
    {
        await _authService.LogoutAsync();
    }
}