// Data/Repositories/IUserRepository.cs
using DSDMLearning.API.Models;
using System.Threading.Tasks;

namespace DSDMLearning.API.Data.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetByIdAsync(int id);
        Task<User> GetByEmailAsync(string email);
        Task<User> GetByUsernameAsync(string username);
        Task<bool> CreateAsync(User user);
        Task<bool> UpdateAsync(User user);
    }
}