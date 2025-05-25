// Controllers/UserController.cs
using DSDMLearning.API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DSDMLearning.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IAuthService _authService;

        public UserController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = HttpContext.Session.GetInt32("UserId");
            if (userId == null)
            {
                return Unauthorized(new { Success = false, Message = "Usuário não está autenticado." });
            }

            var user = await _authService.GetUserByIdAsync(userId.Value);

            if (user == null)
            {
                return NotFound(new { Success = false, Message = "Usuário não encontrado." });
            }

            return Ok(new
            {
                Success = true,
                User = new
                {
                    user.Id,
                    user.Username,
                    user.Email,
                    user.FirstName,
                    user.LastName,
                    user.CreatedAt,
                    user.LastLogin
                }
            });
        }
    }
}