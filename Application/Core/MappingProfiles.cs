using System;
using Application.Activities.DTOs;
using Application.Profiles.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    /// <summary>
    /// Defines the mapping profiles for AutoMapper, specifying how to map between domain models and DTOs.
    /// Allows for easy transformation of data between different layers of the application, such as from the database entities to the API response models.
    /// Including: Projection, Reverse Mapping, and Custom Mappings for specific properties.
    /// </summary>
    public MappingProfiles()
    {
        CreateMap<Activity, Activity>();
        CreateMap<CreateActivityDTO, Activity>().ReverseMap();
        CreateMap<EditActivityDTO, Activity>().ReverseMap();

        CreateMap<Activity, ActivityDTO>()
            .ForMember(d => d.HostDisplayName, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User.DisplayName))
            .ForMember(d => d.HostId, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User.Id));

        CreateMap<ActivityAttendee, UserProfile>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.User.Id))
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.User.Bio))
            .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl));

        CreateMap<User, UserProfile>();

        CreateMap<Comment, CommentDTO>()
        .ForMember(d => d.UserId, o => o.MapFrom(s => s.User.Id))
        .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
        .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl));
    }

}
