using Todo.Api.Data;
using Todo.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Todo.Api.Endpoints;

public static class TodoEndpoints
{
    public static RouteGroupBuilder MapTodoEndpoints(this IEndpointRouteBuilder app)    
    {
        var group = app.MapGroup("/api/todos");

        // GET
        group.MapGet("/", async (AppDbContext db) =>
            await db.Todos.ToListAsync());

        // POST
        group.MapPost("/", async (TodoItem todo, AppDbContext db) =>
        {
            todo.Id = Guid.NewGuid();

            db.Todos.Add(todo);
            await db.SaveChangesAsync();

            return Results.Ok(todo);
        });

        // TOGGLE
        group.MapPut("/{id:guid}/toggle", async (Guid id, AppDbContext db) =>
        {
            var todo = await db.Todos.FindAsync(id);

            if (todo is null)
                return Results.NotFound();

            todo.Completed = !todo.Completed;
            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        // DELETE
        group.MapDelete("/{id:guid}", async (Guid id, AppDbContext db) =>
        {
            var todo = await db.Todos.FindAsync(id);

            if (todo is null)
                return Results.NotFound();

            db.Todos.Remove(todo);
            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        return group;
    }
}
