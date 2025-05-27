// Services/AuthService.cs
using DSDMLearning.API.Data;
using DSDMLearning.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace DSDMLearning.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;

        public AuthService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<AuthResponse> RegisterAsync(RegisterRequest model)
        {
            // Verificar se o email já existe
            if (await _context.Users.AnyAsync(u => u.Email == model.Email))
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "Email já está em uso."
                };
            }

            // Verificar se o username já existe
            if (await _context.Users.AnyAsync(u => u.Username == model.Username))
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "Nome de usuário já está em uso."
                };
            }

            // Criar hash da senha
            string passwordHash = HashPassword(model.Password);

            // Criar novo usuário
            var user = new User
            {
                Username = model.Username,
                Email = model.Email,
                PasswordHash = passwordHash,
                FirstName = model.FirstName,
                LastName = model.LastName,
                CreatedAt = DateTime.UtcNow
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return new AuthResponse
            {
                Success = true,
                Message = "Registro realizado com sucesso!",
                User = new UserInfo
                {
                    Id = user.Id,
                    Username = user.Username,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Sobre = user.Sobre
                }
            };
        }

        public async Task<AuthResponse> LoginAsync(LoginRequest model)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);

            if (user == null)
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "Email ou senha incorretos."
                };
            }

            // Verificar senha
            if (!VerifyPassword(model.Password, user.PasswordHash))
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "Email ou senha incorretos."
                };
            }

            // Atualizar último login
            user.LastLogin = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return new AuthResponse
            {
                Success = true,
                Message = "Login realizado com sucesso!",
                User = new UserInfo
                {
                    Id = user.Id,
                    Username = user.Username,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Sobre = user.Sobre
                }
            };
        }

        public async Task<User> GetUserByIdAsync(int userId)
        {
            return await _context.Users.FindAsync(userId);
        }

        public async Task SalvarAsync()
        {
            await _context.SaveChangesAsync();
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }

        private bool VerifyPassword(string password, string storedHash)
        {
            string passwordHash = HashPassword(password);
            return passwordHash == storedHash;
        }
    }
}