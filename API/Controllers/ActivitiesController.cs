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
    public async Task<ActionResult<List<Activity>>> GetActivities()
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

    [HttpPut]
    public async Task<ActionResult<string>> EditActivity(EditActivityDTO activity)
    {
        return HandleResult(await Mediator.Send(new EditActivity.Command{ActivityDTO = activity}));
    }
    
    [HttpDelete("{id}")]
    public async Task<ActionResult<string>> DeleteActivity(string id)
    {
        return HandleResult(await Mediator.Send(new DeleteActivity.Command{Id = id}));
    }
}