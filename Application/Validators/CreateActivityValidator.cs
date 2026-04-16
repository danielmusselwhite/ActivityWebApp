using System;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Validators;
using FluentValidation;

namespace Application.Validators;

public class CreateActivityValidator : BaseActivityValidator<CreateActivity.Command, CreateActivityDTO>
{
    public CreateActivityValidator() : base(x => x.ActivityDTO)
    {
    }
}