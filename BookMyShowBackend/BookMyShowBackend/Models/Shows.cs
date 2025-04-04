using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BookMyShowBackend.Models
{
    [Table("ShowsList")]
    public class Shows
    {
        [Key]
        public int ShowId { get; set; }

        [ForeignKey("Movie")]
        public int MovieId { get; set; }
        public Movie Movie { get; set; }

        [Required]
        public string CinemaHall { get; set; }

        [Required]
        public string Date { get; set; }

        [Required]
        public string Timing { get; set; }

        [Required]
        public int AvailableSeats { get; set; }

        [Required]
        public int Price { get; set; }
    }
}
