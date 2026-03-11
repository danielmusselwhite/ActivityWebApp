using System;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Validators;

public class EditActivityValidator : BaseActivityValidator<EditActivity.Command, EditActivityDTO>
{
    public EditActivityValidator() : base(x => x.ActivityDTO)
    {
        RuleFor(x => x.ActivityDTO.Id)
        .NotEmpty().WithMessage("Id is required")
        .Must(x => x.Length == 36).WithMessage("GUID must be 36 characters");
    }
}
