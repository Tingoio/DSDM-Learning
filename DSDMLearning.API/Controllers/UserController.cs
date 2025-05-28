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
        public async Task<IActionResult> AtualizarSobre()
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
                    user.Sobre,
                    user.EstudoCaso,
                    user.MateriaisEducativos,
                    user.Quizzes,
                    user.Faq,
                    user.Certificado,
                }
            });
        }

        [HttpPut("atualizar-estudoCaso")]
        public async Task<IActionResult> AtualizarEstudoCaso()
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

            user.EstudoCaso = true;
            await _authService.SalvarAsync();

            return Ok(new
            {
                Success = true,
                Message = "Campo 'Estudo de Caso' atualizado com sucesso.",
                User = new
                {
                    user.Id,
                    user.Username,
                    user.Email,
                    user.Sobre,
                    user.EstudoCaso,
                    user.MateriaisEducativos,
                    user.Quizzes,
                    user.Faq,
                    user.Certificado,
                }
            });
        }

        [HttpPut("atualizar-materiaisEducativos")]
        public async Task<IActionResult> AtualizarMateriaisEducativos()
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

            user.MateriaisEducativos = true;
            await _authService.SalvarAsync();

            return Ok(new
            {
                Success = true,
                Message = "Campo 'Materiais Educativos' atualizado com sucesso.",
                User = new
                {
                    user.Id,
                    user.Username,
                    user.Email,
                    user.Sobre,
                    user.EstudoCaso,
                    user.MateriaisEducativos,
                    user.Quizzes,
                    user.Faq,
                    user.Certificado,
                }
            });
        }

        [HttpPut("atualizar-quizzes")]
        public async Task<IActionResult> AtualizarQuizzes()
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

            user.Quizzes = true;
            await _authService.SalvarAsync();

            return Ok(new
            {
                Success = true,
                Message = "Campo 'Quizzes' atualizado com sucesso.",
                User = new
                {
                    user.Id,
                    user.Username,
                    user.Email,
                    user.Sobre,
                    user.EstudoCaso,
                    user.MateriaisEducativos,
                    user.Quizzes,
                    user.Faq,
                    user.Certificado,
                }
            });
        }
        
        [HttpPut("atualizar-faq")]
        public async Task<IActionResult> AtualizarFaq()
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

            user.Faq = true;
            await _authService.SalvarAsync();

            return Ok(new
            {
                Success = true,
                Message = "Campo 'FAQ' atualizado com sucesso.",
                User = new
                {
                    user.Id,
                    user.Username,
                    user.Email,
                    user.Sobre,
                    user.EstudoCaso,
                    user.MateriaisEducativos,
                    user.Quizzes,
                    user.Faq,
                    user.Certificado,
                }
            });
        }

        [HttpPut("atualizar-certificado")]
        public async Task<IActionResult> AtualizarCertificado()
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

            user.Certificado = true;
            await _authService.SalvarAsync();

            return Ok(new
            {
                Success = true,
                Message = "Campo 'Certificado' atualizado com sucesso.",
                User = new
                {
                    user.Id,
                    user.Username,
                    user.Email,
                    user.Sobre,
                    user.EstudoCaso,
                    user.MateriaisEducativos,
                    user.Quizzes,
                    user.Faq,
                    user.Certificado,
                }
            });
        }

    }
}