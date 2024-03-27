using Interfuse.Auth.Api.Infrastructure;
using Interfuse.Auth.Infrastructure.Data;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Add loggings to the container
builder.Host.UseSerilog((context, logConfig) => logConfig.ReadFrom.Configuration(context.Configuration));

// Add services to the container.
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddWebServices();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    await app.InitialiseDatabaseAsync();
}

app.UseSerilogRequestLogging();

app.UseHealthChecks("/api/health");

app.UseSwagger();
app.UseSwaggerUI();

app.UseExceptionHandler(options => { });

app.MapEndpoints();

app.Run();

public partial class Program { }