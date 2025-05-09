using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class NotesContext : DbContext
    {
        public NotesContext(DbContextOptions<NotesContext> options)
            : base(options)
        {
        }

        // Aquí se expone el DbSet de notas
        public DbSet<Note> Notes { get; set; }
    }
}
