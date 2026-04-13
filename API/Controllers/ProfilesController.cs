using System;
using System.Reflection.Metadata;
using Application.Profiles.Commands;
using Application.Profiles.Queries;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ProfilesController() : BaseApiController
{
    [HttpPost("add-photo")]
    public async Task<IActionResult> AddPhoto([FromForm] IFormFile file)
    {
       return HandleResult(await Mediator.Send(new AddPhoto.Command { File = file }));
    }

    [HttpGet("{userId}/photos")]
    public async Task<ActionResult<List<Photo>>> GetPhotosForUser(string userId)
    {
        return HandleResult(await Mediator.Send(new GetProfilePhoto.Query { UserId = userId }));
    }
    
    [HttpDelete("{photoId}/photos")]
    public async Task<IActionResult> DeletePhoto(string photoId)
    {
       return HandleResult(await Mediator.Send(new DeletePhoto.Command { PhotoId = photoId }));
    }
}
