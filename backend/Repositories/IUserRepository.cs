using Backend.Models;

namespace Backend.Repositories;

public interface IUserRepository
{
    Task<IList<User>> GetUsers();
    Task<User?> GetUser(string username);
    Task<User> CreateUser(User user);
}
