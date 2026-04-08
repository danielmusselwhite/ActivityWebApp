using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Activities.Queries;
using Domain;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Application.Core;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers;

public class ActivitiesController() : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<ActivityDTO>>> GetActivities()
    {
        return Ok(await Mediator.Send(new GetActivityList.Query()));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ActivityDTO>> GetActivity(string id)
    {
        return HandleResult(await Mediator.Send(new GetActivityDetails.Query{Id = id}));
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(CreateActivityDTO activityDto)
    {
        return HandleResult(await Mediator.Send(new CreateActivity.Command{ActivityDTO = activityDto}));
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "IsActivityHost")] // This will ensure that only the host of the activity can edit the activity
    public async Task<ActionResult<string>> EditActivity(string id, EditActivityDTO activity)
    {
        activity.Id = id;
        return HandleResult(await Mediator.Send(new EditActivity.Command{ActivityDTO = activity}));
    }
    
    [HttpDelete("{id}")]
    [Authorize(Policy = "IsActivityHost")] // This will ensure that only the host of the activity can delete the activity
    public async Task<ActionResult<string>> DeleteActivity(string id)
    {
        return HandleResult(await Mediator.Send(new DeleteActivity.Command{Id = id}));
    }

    [HttpPost("{id}/attend")]
    public async Task<ActionResult<Unit>> Attend(string id)
    {
        return HandleResult(await Mediator.Send(new UpdateAttendance.Command{Id = id}));
    }
}