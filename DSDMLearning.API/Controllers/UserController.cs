// Controllers/UserController.cs
using DSDMLearning.API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;


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

        [HttpPut("atualizar-sobre")]
        [AllowAnonymous] // <- Permite acesso mesmo sem sessão/autenticação
        public async Task<IActionResult> AtualizarSobre([FromBody] int userId)
        {
            var user = await _authService.GetUserByIdAsync(userId);

            if (user == null)
            {
                return NotFound(new { Success = false, Message = "Usuário não encontrado." });
            }

            user.Sobre = true;
            await _authService.SalvarAsync();

            return Ok(new
            {
                Success = true,
                Message = "Campo 'Sobre' atualizado com sucesso.",
                User = new
                {
                    user.Id,
                    user.Username,
                    user.Email,
                    user.Sobre
                }
            });
        }

    }
}