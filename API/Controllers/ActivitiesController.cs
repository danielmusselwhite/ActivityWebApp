using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Activities.Queries;
using Application.Errors;
using Domain;
using Application.Activities.Commands;

namespace API.Controllers;

public class ActivitiesController() : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Domain.Activity>>> GetActivities()
    {
        try
        {
            return Ok(await Mediator.Send(new GetActivityList.Query()));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Domain.Activity>> GetActivity(string id)
    {
        try
        {
            return Ok(await Mediator.Send(new GetActivityDetails.Query{Id = id}));
        }
        catch (NotFoundException ex) 
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(Activity activity)
    {
        try
        {
            return Ok(await Mediator.Send(new CreateActivity.Command{Activity = activity}));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    
    [HttpPut]
    public async Task<ActionResult<string>> EditActivity(Activity activity)
    {
        try
        {
            await Mediator.Send(new EditActivity.Command{Activity = activity});
            return NoContent(); // no point sending anything back to client, as they know what has been updated
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}