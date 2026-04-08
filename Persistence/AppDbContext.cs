using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    #region DbSets
    public required DbSet<Activity> Activities { get; set; }
    public required DbSet<ActivityAttendee> ActivityAttendees { get; set; }
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
    }
}
