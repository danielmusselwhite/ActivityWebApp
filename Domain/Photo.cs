using System;

namespace Domain;

public class Photo
{
    public required string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Url { get; set; }
    public required string PublicId { get; set; }

}
