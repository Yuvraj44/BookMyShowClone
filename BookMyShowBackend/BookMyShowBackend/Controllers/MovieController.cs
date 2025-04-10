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
    public class MovieController : Controller
    {
        private readonly BookMyShowContext _context;
        public MovieController(BookMyShowContext context)
        {
            _context = context;
        }

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
        [Authorize(Policy = "AdminOnly")]
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
        [Authorize(Policy = "AdminOnly")]
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
        [Authorize(Policy = "AdminOnly")]
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



    }
}
