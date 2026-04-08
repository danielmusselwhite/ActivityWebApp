using System;
using Application.Profiles.DTOs;

namespace Application.Activities.DTOs;

public class ActivityDTO
{
    public string Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public DateTime Date { get; set; }
    public required string Category { get; set; }
    public bool IsCancelled { get; set; }
    public required string HostDisplayName {get; set;}
    public required string HostId { get; set; }

    #region location props
    public required string City { get; set; }
    public required string Venue { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    #endregion

    #region navigation props
    public ICollection<UserProfile> Attendees { get; set; } = new List<UserProfile>();
    #endregion
}
