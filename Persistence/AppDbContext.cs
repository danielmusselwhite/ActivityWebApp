using System;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

#region DbSets
    public required DbSet<Domain.Activity> Activities { get; set; }
#endregion
}
