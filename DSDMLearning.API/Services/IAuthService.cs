// Services/IAuthService.cs
using DSDMLearning.API.Models;
using System.Threading.Tasks;

namespace DSDMLearning.API.Services
{
    public interface IAuthService
    {
        Task<AuthResponse> RegisterAsync(RegisterRequest model);
        Task<AuthResponse> LoginAsync(LoginRequest model);
        Task<User> GetUserByIdAsync(int userId);
    }
}