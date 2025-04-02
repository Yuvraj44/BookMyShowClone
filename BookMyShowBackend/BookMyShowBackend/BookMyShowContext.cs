using Microsoft.EntityFrameworkCore;
using BookMyShowBackend.Models;

namespace BookMyShowBackend
{
    public class BookMyShowContext : DbContext
    {
        public BookMyShowContext(DbContextOptions<BookMyShowContext> options) : base(options) { }

        public DbSet<Movie> MovieList { get; set; }
        public DbSet<Shows> ShowsList { get; set; }
        public DbSet<Users> UsersList { get; set; }
        public DbSet<Booking> BookingList { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Movie>()
    .Property(m => m.MovieId)
    .ValueGeneratedOnAdd(); // Enables auto-increment


            modelBuilder.Entity<Shows>().ToTable("ShowsList");
            modelBuilder.Entity<Users>().ToTable("UsersList");
        }
    }
}
