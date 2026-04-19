using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    #region DbSets
    public required DbSet<Activity> Activities { get; set; }
    public required DbSet<ActivityAttendee> ActivityAttendees { get; set; }
    public required DbSet<Photo> Photos { get; set; }
    public required DbSet<Comment> Comments { get; set; }
    #endregion

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        #region setting up Many-to-Many relationship between User and Activity via ActivityAttendee
        // Composite primary key for ActivityAttendee
        builder.Entity<ActivityAttendee>()
            .HasKey(aa => new { aa.ActivityId, aa.UserId });

        // Configure 1 side of the relationship: ActivityAttendee can have many User
        builder.Entity<ActivityAttendee>()
            .HasOne(aa => aa.User)
            .WithMany(u => u.Attendees)
            .HasForeignKey(aa => aa.UserId);

        // Configure the other side of the relationship: ActivityAttendee can have many Activity
        builder.Entity<ActivityAttendee>()
            .HasOne(aa => aa.Activity)
            .WithMany(a => a.Attendees)
            .HasForeignKey(aa => aa.ActivityId);
        #endregion

        #region setting up ValueConverter for DateTime properties to ensure they are stored and retrieved as UTC in the database

        var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
            v => v.ToUniversalTime(), // Convert to UTC when saving to the database
            v => DateTime.SpecifyKind(v, DateTimeKind.Utc) // Specify that the DateTime is UTC when reading from the database
        );

        foreach (var entityType in builder.Model.GetEntityTypes())
        {
            foreach (var property in entityType.GetProperties())
            {
                if (property.ClrType == typeof(DateTime) || property.ClrType == typeof(DateTime?))
                {
                    property.SetValueConverter(dateTimeConverter); // Apply the DateTime converter to all DateTime properties in the model
                }
            }
        }

        // Apply the DateTime converter to all DateTime properties in the model
        #endregion
    }
}
