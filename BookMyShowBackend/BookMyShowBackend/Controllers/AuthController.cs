using BookMyShowBackend.DTO;
using BookMyShowBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace BookMyShowBackend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api")]
    public class AuthController : Controller
    {
        private readonly BookMyShowContext _context;
        private readonly IConfiguration _config;

        public AuthController(BookMyShowContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

       
        
        [AllowAnonymous]
        [HttpPost("auth/login")]
        public async Task<ActionResult> Login([FromBody] LogInDTO dto)
        {
            var user = await _context.UsersList.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null || user.Password != dto.Password)
                return Unauthorized("Invalid credentials");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim("IsAdmin", user.IsAdmin.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            string jwt = tokenHandler.WriteToken(token);

            return Ok(new { token = jwt, user });
        }
       
        
        
        [AllowAnonymous]
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

            return Ok(user);
        }


        [Authorize(Policy = "AdminOnly")]
        [HttpGet("users/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            try
            {
                var user = await _context.UsersList.FindAsync(id);
                if (user == null)
                    return NotFound(new { message = "User not found." });

                return Ok(user);
            }
            catch (SqlException ex)
            {
                return StatusCode(500, $"SQL Server issue: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Unexpected error: {ex.Message}");
            }
        }


        [Authorize(Policy = "AdminOnly")]
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
                return StatusCode(500, $"SQL Server issue: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Unexpected error: {ex.Message}");
            }
        }

      
        
        [Authorize(Policy = "AdminOnly")]
        [HttpPost("/toogleAdmin/{id}")]
        public async Task<ActionResult> UpdateAdmin(int id)
        {
            var user = await _context.UsersList.FindAsync(id);
            if (user == null)
                return NotFound("User not found.");

            user.IsAdmin = !user.IsAdmin;
            await _context.SaveChangesAsync();
            return Ok(user);
        }

     
        
        
        [HttpDelete("/delete/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.UsersList.FindAsync(id);
            if (user == null)
                return NotFound("User not found.");

            _context.UsersList.Remove(user);
            await _context.SaveChangesAsync();
            return Ok(new { message = "User deleted successfully." });
        }
    }
}
