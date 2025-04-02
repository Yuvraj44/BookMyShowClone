using System;

namespace BookMyShowBackend.DTO
{
    public class ShowsDTO
    {
        public int ShowId { get; set; }
        public int MovieId { get; set; }
        public string CinemaHall { get; set; }
        public DateTime Date { get; set; } 
        public TimeSpan Timing { get; set; } 
        public int AvailableSeats { get; set; }
        public int Price { get; set; }
    }
}
