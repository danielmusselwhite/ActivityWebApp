using System;
using System.Reflection.Metadata;
using Application.Profiles.Commands;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ProfilesController() : BaseApiController
{
    [HttpPost("add-photo")]
    public async Task<IActionResult> AddPhoto([FromForm] IFormFile file)
    {
       return HandleResult(await Mediator.Send(new AddPhoto.Command { File = file }));
    }
    
    [HttpDelete("delete-photo")]
    public async Task<IActionResult> DeletePhoto(string publicId)
    {
       return HandleResult(await Mediator.Send(new DeletePhoto.Command { PublicId = publicId }));
    }
}
