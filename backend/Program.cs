using Microsoft.EntityFrameworkCore;
using backend.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. OpenAPI/Swagger
builder.Services.AddOpenApi();

// 2. InMemory para Notes
builder.Services.AddDbContext<NotesContext>(opt =>
    opt.UseInMemoryDatabase("NotesList"));

// 3. CORS: leemos arrays directamente de configuración
var corsOrigins = builder.Configuration
    .GetSection("Cors:Origins")
    .Get<string[]>() 
    ?? Array.Empty<string>();

var corsMethods = builder.Configuration
    .GetSection("Cors:Methods")
    .Get<string[]>() 
    ?? Array.Empty<string>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy
          .WithOrigins(corsOrigins)
          .WithMethods(corsMethods)
          .AllowAnyHeader();
    });
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