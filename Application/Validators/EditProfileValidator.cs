using System;
using Application.Profiles.Commands;
using Application.Profiles.DTOs;
using FluentValidation;

namespace Application.Validators;

public class EditProfileValidator : AbstractValidator<EditProfile.Command>
{
    public EditProfileValidator()
    {
        RuleFor(x => x.ProfileDto.DisplayName)
        .NotEmpty().WithMessage("DisplayName is required");
    }
}
