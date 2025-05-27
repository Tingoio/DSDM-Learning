// Controllers/AuthController.cs
using DSDMLearning.API.Models;
using DSDMLearning.API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Threading.Tasks;

namespace DSDMLearning.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _authService.RegisterAsync(model);

            if (!result.Success)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _authService.LoginAsync(model);

            if (!result.Success)
            {
                return BadRequest(result);
            }

            // Criar sessão para o usuário
            HttpContext.Session.SetInt32("UserId", result.User.Id);
            HttpContext.Session.SetString("Username", result.User.Username);
            HttpContext.Session.SetString("UserInfo", JsonSerializer.Serialize(result.User));

            // Log para depuração
            Console.WriteLine($"Sessão criada para usuário: {result.User.Id} - {result.User.Username}");
            Console.WriteLine($"Cookie de sessão: {HttpContext.Request.Cookies[".DSDMLearning.Session"]}");

            return Ok(result);
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Limpar a sessão
            HttpContext.Session.Clear();
            return Ok(new { Success = true, Message = "Logout realizado com sucesso!" });
        }

        [HttpGet("check-session")]
        public IActionResult CheckSession()
        {
            var userId = HttpContext.Session.GetInt32("UserId");

            // Log para depuração
            Console.WriteLine($"Verificação de sessão: UserId = {userId}");

            if (userId == null)
            {
                return Ok(new { Success = false, Message = "Usuário não está autenticado." });
            }

            var userInfoJson = HttpContext.Session.GetString("UserInfo");
            var userInfo = JsonSerializer.Deserialize<UserInfo>(userInfoJson);

            return Ok(new { Success = true, User = userInfo });
        }
    }
}