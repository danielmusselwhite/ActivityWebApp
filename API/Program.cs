using Application.Activities.Queries;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using AutoMapper;
using FluentValidation;
using Application.Activities.Validators;
using API.Middleware;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;

var builder = WebApplication.CreateBuilder(args);

#region  Add services to the container.

// Adding controllers with a global authorization policy, which will require all API endpoints to be accessed by authenticated users
builder.Services.AddControllers(opt =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
});
builder.Services.AddDbContext<Persistence.AppDbContext>( options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
#endregion

builder.Services.AddCors();

#region Adding our custom services
builder.Services.AddMediatR(x =>
{
    x.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>();
    x.RegisterServicesFromAssemblyContaining<GetActivityDetails.Handler>();
    x.AddOpenBehavior(typeof(ValidationBehaviour<,>));
});


// x.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>());
// builder.Services.AddMediatR(x => x.RegisterServicesFromAssemblyContaining<GetActivityDetails.Handler>());
#endregion

// Registering auto mapper
builder.Services.AddAutoMapper(cfg =>
{
    cfg.AddMaps(typeof(MappingProfiles).Assembly);
});

builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();
builder.Services.AddTransient<ExceptionMiddleware>();


// Adding Identity API Endpoints for User registration and login, and configuring password requirements
builder.Services.AddIdentityApiEndpoints<User>(opt =>
{
    opt.User.RequireUniqueEmail = true;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<Persistence.AppDbContext>();

builder.Services.AddAuthorization();

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>(); // adding middleware for API requests
app.UseCors(options => options.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000", "https://localhost:3000")); // Allow all requests from our React App (host urls)

// Adding identity API requirements for authentication and authorization
app.UseAuthentication();
app.UseAuthorization();

// Configure the HTTP request pipeline.
app.MapControllers();
app.MapGroup("api").MapIdentityApi<User>(); // Map the endpoints for the Identity API, which will handle user registration and login

#region service locator pattern to get an instance of the AppDbContext & UserManager and seed the database with initial data
// we need to create a scope to get an instance of the AppDbContext, as it is registered as a scoped service, and we are in the Program.cs file which is the entry point of the application, so we can't use dependency injection to get an instance of the AppDbContext, so we need to create a scope and then get an instance of the AppDbContext from the service provider, then we can apply any pending migrations to the database and seed the database with initial data 
using var scope = app.Services.CreateScope(); 
var services = scope.ServiceProvider;
try
{
    // apply any pending migrations to the database, then seed the database with initial data
    var context = services.GetRequiredService<Persistence.AppDbContext>();
    var userManager = services.GetRequiredService<UserManager<User>>();
    await context.Database.MigrateAsync();
    #if DEBUG
    await Persistence.DbInitializer.SeedData(context, userManager);
    #endif
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred migrating and seeding the DB.");
}
#endregion

app.Run();
