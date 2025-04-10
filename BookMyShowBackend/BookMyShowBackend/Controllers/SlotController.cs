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
    public class SlotController : Controller
    {
        private readonly BookMyShowContext _context;
        public SlotController(BookMyShowContext context)
        {
            _context = context;
        }

        [HttpGet("movies/slots/{id}")]
        public async Task<IActionResult> GetShowsByMovieId(int id)
        {
            try
            {

                var shows = await _context.ShowsList
                                  .Where(s => s.MovieId == id)
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
        [HttpGet("slot/{id}")]
        public async Task<IActionResult> GetSlotById(int id)
        {
            try
            {
                var show = await _context.ShowsList
                    .Where(s => s.ShowId == id)
                    .Select(s => new {
                        s.ShowId,
                        s.MovieId,
                        MovieName = s.Movie.Title, // Assuming 'Title' is the movie name field
                        s.CinemaHall,
                        s.Date,
                        s.Timing,
                        s.AvailableSeats,
                        s.Price
                    })
                    .FirstOrDefaultAsync();

                return show != null ? Ok(show) : NotFound(new { message = "Show not found." });
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

        [HttpGet("slots")]
        public async Task<IActionResult> GetAllShows()
        {
            try
            {

                var shows = await _context.ShowsList
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

        [Authorize(Policy = "AdminOnly")]
        [HttpPost("movies/slots/create")]
        public async Task<IActionResult> CreateShow(ShowsDTO showDto)
        {
            try
            {
                var show = new Shows
                {
                    MovieId = showDto.MovieId,
                    CinemaHall = showDto.CinemaHall,
                    Date = showDto.Date,
                    Timing = showDto.Timing,
                    AvailableSeats = showDto.AvailableSeats,
                    Price = showDto.Price
                };

                _context.ShowsList.Add(show);
                await _context.SaveChangesAsync();
                return Ok(show);
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                }
                return StatusCode(500, $"Unexpected error: {ex.Message}");
            }
        }
        [Authorize(Policy = "AdminOnly")]
        [HttpPut("movies/slots/update/{id}")]
        public async Task<IActionResult> UpdateShow(int id, ShowsDTO updatedShow)
        {
            var show = await _context.ShowsList.FindAsync(id);

            if (show == null)
                return NotFound("Show not found");

            show.MovieId = updatedShow.MovieId;
            show.CinemaHall = updatedShow.CinemaHall;
            show.Date = updatedShow.Date;
            show.Timing = updatedShow.Timing;
            show.AvailableSeats = updatedShow.AvailableSeats;
            show.Price = updatedShow.Price;

            await _context.SaveChangesAsync();
            return Ok(show);
        }
        [Authorize(Policy = "AdminOnly")]
        [HttpDelete("movies/slot/delete/{id}")]
        public async Task<IActionResult> DeleteShow(int id)
        {
            var show = await _context.ShowsList.FindAsync(id);
            if (show == null) return NotFound("Show not found");

            _context.ShowsList.Remove(show);
            await _context.SaveChangesAsync();

            return Ok("Show deleted successfully");
        }
    }
}
