using System;

namespace BookMyShowBackend.DTO
{
    public class ShowsDTO
    {
       
        public int MovieId { get; set; }
        public string CinemaHall { get; set; }
        public string Date { get; set; } 
        public string Timing { get; set; } 
        public int AvailableSeats { get; set; }
        public int Price { get; set; }
    }
}
