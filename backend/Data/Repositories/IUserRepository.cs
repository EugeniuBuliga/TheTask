using Backend.Models;

namespace Backend.Data.Repositories;

public interface IUserRepository
{
    Task<IList<User>> GetUsers();
    Task<User?> GetUser(string username);
    Task<User> CreateUser(User user);
}
