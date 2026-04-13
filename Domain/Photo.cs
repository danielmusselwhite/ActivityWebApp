using System;
using System.Text.Json.Serialization;

namespace Domain;

public class Photo
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Url { get; set; }
    public required string PublicId { get; set; }

    #region navigation properties
    public required string UserId { get; set; }
    [JsonIgnore] // to prevent circular reference when serializing the user, we ignore the user property when serializing a photo
    public User User { get; set; } = null!; 
    #endregion

}
