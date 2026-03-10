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
using Application.Activities.DTOs;

namespace API.Controllers;

public class ActivitiesController() : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Domain.Activity>>> GetActivities()
    {
        return Ok(await Mediator.Send(new GetActivityList.Query()));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Domain.Activity>> GetActivity(string id)
    {
        return Ok(await Mediator.Send(new GetActivityDetails.Query{Id = id}));
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(CreateActivityDTO activityDto)
    {
        return Ok(await Mediator.Send(new CreateActivity.Command{ActivityDTO = activityDto}));
    }

    [HttpPut]
    public async Task<ActionResult<string>> EditActivity(Activity activity)
    {
        await Mediator.Send(new EditActivity.Command{Activity = activity});
        return NoContent(); // no point sending anything back to client, as they know what has been updated
    }
    
    [HttpDelete("{id}")]
    public async Task<ActionResult<string>> DeleteActivity(string id)
    {
        await Mediator.Send(new DeleteActivity.Command{Id = id});
        return Ok(); // no point sending anything back to client, as they know what has been updated
    }
}