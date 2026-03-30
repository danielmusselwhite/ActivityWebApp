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

    [AllowAnonymous] // This endpoint should be accessible without authentication as well, so it can be used to log in
    [HttpGet("user-info")]
    public async Task<ActionResult> GetUserInfo()
    {
        if (User.Identity?.IsAuthenticated == false) return NoContent(); // Return 204 No Content if the user is not authenticated
        
        var user = await signInManager.UserManager.GetUserAsync(User);
        if (user == null) return Unauthorized(); // Return 401 Unauthorized if the user is authenticated but not found in the database
            
        // If we reach here, user is logged in (authenticated) and we do have their info, so we return it. We can return any info we want here, but for security reasons, we should avoid returning sensitive information like password hashes, security stamps, etc.
        return Ok(new
        {
            user.DisplayName,
            user.Email,
            user.Id,
            user.ImageUrl
        });
    }

    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        await signInManager.SignOutAsync();
        return NoContent();
    }
}
