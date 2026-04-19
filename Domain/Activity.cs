using System;

namespace Domain;

public class Activity
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Title { get; set; }
    public required string Description { get; set; }
    public DateTime Date { get; set; }
    public required string Category { get; set; }
    public bool IsCancelled { get; set; }

    #region location props
    public required string City { get; set; }
    public required string Venue { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    #endregion

    #region navigation props
    public ICollection<ActivityAttendee> Attendees { get; set; } = new List<ActivityAttendee>();
    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    #endregion
}
