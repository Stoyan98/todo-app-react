using Microsoft.EntityFrameworkCore;
using Todo.Api.Data;
using Todo.Api.Features.Todos;

var builder = WebApplication.CreateBuilder(args);

// OpenAPI / Swagger
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseInMemoryDatabase("TodosDb"));

var app = builder.Build();

// Swagger endpoint
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapTodos();

// Test endpoint
app.MapGet("/test", () => "API RUNNING");

app.Run();