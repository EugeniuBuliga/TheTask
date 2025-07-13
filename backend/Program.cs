using Backend.Data;
using Backend.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

#region Service Configuration

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var connString = builder.Configuration.GetConnectionString("PostgresConnection")
                  ?? Environment.GetEnvironmentVariable("DATABASE_URL");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connString));

// Repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();

// Controllers
builder.Services.AddControllers();

#endregion

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

#region Middleware Pipeline

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
//app.UseHttpsRedirection();
app.UseRouting();

// app.UseAuthorization();

app.MapControllers();

#endregion

app.Run();
