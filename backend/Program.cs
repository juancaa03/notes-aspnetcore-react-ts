using Microsoft.EntityFrameworkCore;
using backend.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. OpenAPI/Swagger
builder.Services.AddOpenApi();

// 2. InMemory para Notes
builder.Services.AddDbContext<NotesContext>(opt =>
    opt.UseInMemoryDatabase("NotesList"));

// 3. CORS: leemos de appsettings.json las cadenas y las parseamos
var corsSection = builder.Configuration.GetSection("Cors");
var origins = corsSection["Origins"]?
    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
    ?? Array.Empty<string>();
var methods = corsSection["Methods"]?
    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
    ?? Array.Empty<string>();

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy =>
        policy.WithOrigins(origins)
              .WithMethods(methods)
              .AllowAnyHeader());
});

// 4. Añadimos controladores (NotesController)
builder.Services.AddControllers();

var app = builder.Build();

// 5. Swagger sólo en dev
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// 6. Activar CORS antes de MapControllers
app.UseCors("CorsPolicy");

// 7. Mapear controladores
app.MapControllers();

app.Run();