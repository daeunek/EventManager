using Microsoft.EntityFrameworkCore;
using Models;
using MyApp.Api.Models.Domain;


namespace Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<PEvent> Events { get; set; }
        public DbSet<Category> Categories { get; set; }

        public DbSet<EventImage> EventImages { get; set; }

        
       
    }
}