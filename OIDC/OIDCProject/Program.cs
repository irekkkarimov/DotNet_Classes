using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OIDCProject.Contexts;
using OIDCProject.CustomPolicies;
using OIDCProject.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("POSTGRESQL_CONNECTION_STRING")));

builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
    {
        options.Password.RequireLowercase = false;
        options.Password.RequireUppercase = false;
        options.Password.RequireDigit = false;
        options.User.RequireUniqueEmail = true;
        options.SignIn.RequireConfirmedEmail = true;
    })
    .AddEntityFrameworkStores<AppDbContext>()
    .AddUserValidator<CustomUserValidator>()
    .AddPasswordValidator<CustomPasswordValidator>()
    .AddDefaultTokenProviders();

builder.Services.AddScoped<IEmailSender, EmailSender>();
builder.Services.AddScoped<IAuthService, AuthService>();

// builder.Services.AddAuthentication(options =>
//     {
//         options.DefaultScheme = "Application";
//         options.DefaultSignInScheme = "External";
//     })
//     .AddCookie("Application")
//     .AddCookie("External")
//     .AddGoogle(options =>
//     {
//         options.ClientId = builder.Configuration.GetSection("OAuth2:Google:ClientId").Value!;
//         options.ClientSecret = builder.Configuration.GetSection("OAuth2:Google:ClientSecret").Value!;
//     });

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(config =>
    {
        config.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();