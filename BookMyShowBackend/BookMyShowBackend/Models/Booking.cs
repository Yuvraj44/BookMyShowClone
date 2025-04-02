using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BookMyShowBackend.Models
{
    public class Booking
    {
        [Key]
        public int BookingId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public Users User { get; set; }

        [ForeignKey("Show")]
        public int ShowId { get; set; }
        public Shows Show { get; set; }

        public int Tickets { get; set; }
    }


}
