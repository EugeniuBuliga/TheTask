using Backend.Models;

namespace Backend.Repositories;

public interface IUserRepository
{
    Task<IList<User>> GetUsersAsync();
    Task<User> CreateUserAsync(User user);
}
