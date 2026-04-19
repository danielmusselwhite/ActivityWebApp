using API.Middleware;
using Application.Activities.Queries;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using Infrastructure.Photos;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

#region Service Configuration
// Add services to the container.

// Add controllers with a global authorization policy, requiring all API endpoints to be accessed by authenticated users.
builder.Services.AddControllers(opt =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
});

// Add DbContext for Entity Framework Core.
builder.Services.AddDbContext<Persistence.AppDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Add Cross-Origin Resource Sharing (CORS) services.
builder.Services.AddCors();

// Configure mapping of Cloudinary settings from appsettings.json.
builder.Services.Configure<CloudinarySettings>(builder.Configuration.GetSection("CloudinarySettings"));

// Add MediatR for handling CQRS pattern.
builder.Services.AddMediatR(x =>
{
    x.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>();
    x.RegisterServicesFromAssemblyContaining<GetActivityDetails.Handler>();
    x.AddOpenBehavior(typeof(ValidationBehaviour<,>));
});

// Add AutoMapper for object mapping.
builder.Services.AddAutoMapper(cfg =>
{
    cfg.AddMaps(typeof(MappingProfiles).Assembly);
});

// Add FluentValidation for request validation.
builder.Services.AddValidatorsFromAssemblyContaining<Application.Validators.CreateActivityValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<Application.Validators.EditActivityValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<Application.Validators.EditProfileValidator>();

// Add custom middleware for exception handling.
builder.Services.AddTransient<ExceptionMiddleware>();

// Add custom services
builder.Services.AddScoped<IUserAccessor, UserAccessor>();
builder.Services.AddScoped<IPhotoService, PhotoService>();
#endregion

#region Identity Services
// Add Identity API endpoints for user registration and login, and configure password requirements.
builder.Services.AddIdentityApiEndpoints<User>(opt =>
{
    opt.User.RequireUniqueEmail = true;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<Persistence.AppDbContext>();
#endregion

#region Authentication & Authorization
// Add custom authentication and authorization services.
builder.Services.AddAuthorization(opt =>
{
    opt.AddPolicy("IsActivityHost", policy =>
    {
        policy.AddRequirements(new IsHostRequirement());
    });
});
builder.Services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();

// Add default authorization services to ensure that the [Authorize] attribute works correctly.
builder.Services.AddAuthorization();
#endregion

var app = builder.Build();

#region Application Pipeline
// Configure the HTTP request pipeline.

// Use custom middleware for API exception handling.
app.UseMiddleware<ExceptionMiddleware>();

// Use CORS to allow requests from the React app.
app.UseCors(options => options.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000", "https://localhost:3000"));

// Use authentication and authorization.
app.UseAuthentication();
app.UseAuthorization();

// Map controllers for API endpoints.
app.MapControllers();

// Map Identity API endpoints for user management.
app.MapGroup("api").MapIdentityApi<User>();
#endregion

#region Database Seeding
// Seed the database with initial data.
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    // Apply any pending migrations and seed the database.
    var context = services.GetRequiredService<Persistence.AppDbContext>();
    var userManager = services.GetRequiredService<UserManager<User>>();
    await context.Database.MigrateAsync();
    await Persistence.DbInitializer.SeedData(context, userManager);
}
catch (Exception ex)
{
    // Log any errors that occur during database seeding.
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}
#endregion

app.Run();
