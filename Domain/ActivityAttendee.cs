using System;

namespace Domain;

public class ActivityAttendee
{
    #region Foreign Keys and Navigation Properties
    // FK to User
    public string? UserId { get; set; }
    public User User { get; set; } = null!;

    // FK to Activity
    public string? ActivityId { get; set; }
    public Activity Activity { get; set; } = null!;
    #endregion

    #region Additional properties
    public bool IsHost { get; set; } // Indicates if the user is the host of the activity
    public DateTime DateJoined { get; set; } = DateTime.UtcNow;
    #endregion
}
