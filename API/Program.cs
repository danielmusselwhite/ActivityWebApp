using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

#region  Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<Persistence.AppDbContext>( options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
#endregion

builder.Services.AddCors(); // Add Cors

var app = builder.Build();

app.UseCors(options => options.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000", "https://localhost:3000")); // Allow all requests from our React App (host urls)

// Configure the HTTP request pipeline.
app.MapControllers();

#region service locator pattern to get an instance of the AppDbContext and seed the database with initial data
// we need to create a scope to get an instance of the AppDbContext, as it is registered as a scoped service, and we are in the Program.cs file which is the entry point of the application, so we can't use dependency injection to get an instance of the AppDbContext, so we need to create a scope and then get an instance of the AppDbContext from the service provider, then we can apply any pending migrations to the database and seed the database with initial data 
using var scope = app.Services.CreateScope(); 
var services = scope.ServiceProvider;
try
{
    // get an instance of the AppDbContext and apply any pending migrations to the database, then seed the database with initial data
    var context = services.GetRequiredService<Persistence.AppDbContext>();
    await context.Database.MigrateAsync();
    #if DEBUG
    await Persistence.DbInitializer.SeedData(context);
    #endif
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred migrating and seeding the DB.");
}
#endregion

app.Run();
