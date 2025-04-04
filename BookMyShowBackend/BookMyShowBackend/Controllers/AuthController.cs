using Microsoft.AspNetCore.Mvc;

namespace BookMyShowBackend.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : Controller
    {
        [HttpGet("login")]
        public string Index()
        {
            return "Hello";
        }
    }
}
