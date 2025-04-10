using BookMyShowBackend.DTO;
using BookMyShowBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace BookMyShowBackend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api")]
    public class BookingController : Controller
    {

        private readonly BookMyShowContext _context;

        public BookingController(BookMyShowContext context)
        {
            _context = context;
        }


        [HttpPost("ticket")]
        public async Task<IActionResult> CreateBooking([FromBody] TicketDTO request)
        {
            var slot = await _context.ShowsList
            .Include(s => s.Movie)
            .FirstOrDefaultAsync(s => s.ShowId == request.ShowId);


            if (slot == null)
                return NotFound("Slot not found");

            if (slot.AvailableSeats < request.Tickets)
                return BadRequest("Not enough seats available");


            var booking = new Booking
            {
                UserId = request.UserId,
                ShowId = request.ShowId,
                Tickets = request.Tickets
            };

            _context.BookingList.Add(booking);

            // Reduce available seats
            slot.AvailableSeats -= request.Tickets;
            await _context.SaveChangesAsync();

            // Get User Info
            var user = await _context.UsersList.FindAsync(request.UserId);
            if (user == null) return NotFound("User not found");

            // Return Booking Details
            return Ok(new
            {
                movieName = slot.Movie.Title,
                date = slot.Date,
                time = slot.Timing,
                cinemaHall = slot.CinemaHall,
                seats = request.Tickets,
                customerName = user.Name
            });
        }

        [HttpGet("bookings")]
        public async Task<IActionResult> GetAllBookings()
        {
            try
            {
                var users = await _context.BookingList.ToListAsync();



                return Ok(users);
            }
            catch (SqlException ex)
            {
                return StatusCode(500, $"SQL Server issue (Check Connection String): {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Unexpected error: {ex.Message}");
            }
        }

        [HttpGet("bookings/{id}")]
        public async Task<IActionResult> GetBookingsById(int id)
        {
            try
            {

                var shows = await _context.BookingList
                                  .Where(s => s.UserId == id)
                                  .ToListAsync();


                return Ok(shows);
            }
            catch (SqlException ex)
            {
                return StatusCode(500, $"SQL Server issue (Check Connection String): {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Unexpected error: {ex.Message}");
            }

        }

        

    }
}

