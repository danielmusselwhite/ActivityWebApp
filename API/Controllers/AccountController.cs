using System;
using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController(SignInManager<User> signInManager) : BaseApiController
{
    [AllowAnonymous] // This endpoint should be accessible without authentication, obviously
    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDto registerDto)
    {
        var user = new User
        {
            DisplayName = registerDto.DisplayName,
            Email = registerDto.Email,
            UserName = registerDto.Email // using email as username for simplicity
        };

        var result = await signInManager.UserManager.CreateAsync(user, registerDto.Password);

        if (result.Succeeded) return Ok();

        foreach(var error in result.Errors)
        {
            ModelState.AddModelError(error.Code, error.Description);
        }
        return ValidationProblem();
    }
}
