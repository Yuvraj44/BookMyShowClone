using BookMyShowBackend.DTO;
using BookMyShowBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace BookMyShowBackend.Controllers
{
    [ApiController]
    [Route("api")]
    public class BookMyShowController : Controller
    {

        private readonly BookMyShowContext _context;

        public BookMyShowController(BookMyShowContext context)
        {
            _context = context;
        }

        //---------------------------------------------------------------------------------------------

        [HttpGet("movies")]
        public async Task<IActionResult> GetAllMovies([FromQuery] string? genre)
        {
            try
            {
                var movies = _context.MovieList.AsQueryable();

                if (!string.IsNullOrEmpty(genre))
                {
                    movies = movies.Where(m => m.Genre == genre);
                }

                return Ok(await movies.ToListAsync());
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

        [HttpGet("movies/{id}")]
        public async Task<IActionResult> GetMovieById(int id)
        {
            try
            {

                var movie = await _context.MovieList.FindAsync(id);
                if (movie == null)
                {
                    return NotFound();
                }
                return Ok(movie);


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

        [HttpPost("movies/create")]
        public async Task<IActionResult> CreateMovie(Movie movie)
        {
            try
            {
                var maxId = _context.MovieList.Max(m => (int?)m.MovieId) ?? 0;
                movie.MovieId = maxId + 1;

                _context.MovieList.Add(movie);
                await _context.SaveChangesAsync();
                return Ok(movie);
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

        [HttpPut("movies/update/{id}")]
        public async Task<IActionResult> UpdateMovie(int id, Movie updatedMovie)
        {
            try
            {
                var movie = await _context.MovieList.FindAsync(id);
                if (movie == null)
                    return NotFound("Movie not found");

                movie.Title = updatedMovie.Title;
                movie.ImageUrl = updatedMovie.ImageUrl;
                movie.Genre = updatedMovie.Genre;
                movie.Duration = updatedMovie.Duration;
                movie.Description = updatedMovie.Description;

                await _context.SaveChangesAsync();
                return Ok(movie);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Unexpected error: {ex.Message}");
            }
        }

        [HttpDelete("movies/delete/{id}")]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            try
            {
                var movie = await _context.MovieList.FindAsync(id);
                if (movie == null)
                    return NotFound("Movie not found");

                _context.MovieList.Remove(movie);
                await _context.SaveChangesAsync();

                return Ok("Movie deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Unexpected error: {ex.Message}");
            }
        }



        //-------------------------------------------------------------------------------------------

        [HttpGet("movies/slots/{id}")]
        public async Task<IActionResult> GetShows(int id)
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

        [HttpDelete("movies/slot/delete/{id}")]
        public async Task<IActionResult> DeleteShow(int id)
        {
            var show = await _context.ShowsList.FindAsync(id);
            if (show == null) return NotFound("Show not found");

            _context.ShowsList.Remove(show);
            await _context.SaveChangesAsync();

            return Ok("Show deleted successfully");
        }

        //----------------------------------------------------------------------------------------

        [HttpGet("users/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            try
            {
                var user = await _context.UsersList.FindAsync(id);

                if (user == null)
                {
                    return NotFound(new { message = "User not found." });
                }

                return Ok(user);
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

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _context.UsersList.ToListAsync();



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

        [HttpPost("auth/login")]
        public async Task<ActionResult> Login([FromBody] LogInDTO dto)
        {
            var user = await _context.UsersList.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null || user.Password != dto.Password)
                return Unauthorized("Invalid credentials");

            return Ok(new { success = true, user });
        }

        [HttpPost("auth/register")]
        public async Task<ActionResult> Register([FromBody] Users dto)
        {
            if (await _context.UsersList.AnyAsync(u => u.Email == dto.Email))
                return BadRequest("Email already exists.");



            var user = new Users
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = dto.Password,
                Picture = dto.Picture,
                IsAdmin = false
            };

            _context.UsersList.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User registered successfully." });
        }

        [HttpPost("/toogleAdmin/{id}")]
        public async Task<ActionResult> UpdateAdmin(int id)
        {
            var user = await _context.UsersList.FindAsync(id);
            
            if (user == null)
                return NotFound("User not found.");

            user.IsAdmin = !user.IsAdmin;
            await _context.SaveChangesAsync();

            return Ok("User role updated successfully.");
        }

        [HttpDelete("/delete/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.UsersList.FindAsync(id);
            
            if (user == null)
                return NotFound("User not found.");

            _context.UsersList.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User registered successfully." });

        }

        //---------------------------------------------------------------------------

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

    }
}

