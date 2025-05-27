// Middleware/SessionAuthMiddleware.cs
using Microsoft.AspNetCore.Http;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DSDMLearning.API.Middleware
{
    public class SessionAuthMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly string[] _publicPaths = new[] {
            "/api/auth/login",
            "/api/auth/register",
            "/api/auth/check-session",
            "/swagger",  // Para permitir acesso ao Swagger
            "/api/user/atualizar-sobre",
        };

        public SessionAuthMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var path = context.Request.Path.Value?.ToLower();
            Console.WriteLine($"Middleware: Processando requisição para {path}");

            // Permitir acesso a rotas públicas
            if (_publicPaths.Any(p => path.StartsWith(p)) || context.Request.Method == "OPTIONS")
            {
                Console.WriteLine($"Middleware: Rota pública {path}, permitindo acesso");
                await _next(context);
                return;
            }

            // Verificar se o usuário está autenticado
            var userId = context.Session.GetInt32("UserId");
            Console.WriteLine($"Middleware: UserId na sessão = {userId}");
            if (userId == null)
            {
                context.Response.StatusCode = 401; // Unauthorized
                await context.Response.WriteAsJsonAsync(new { Success = false, Message = "Usuário não está autenticado." });
                return;
            }

            await _next(context);
        }
    }

    // Extension method para adicionar o middleware
    public static class SessionAuthMiddlewareExtensions
    {
        public static IApplicationBuilder UseSessionAuth(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<SessionAuthMiddleware>();
        }
    }
}