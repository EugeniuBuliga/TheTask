using Backend.Models;
using Backend.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data.Repositories;

public class UserRepository(AppDbContext context) : IUserRepository
{
    private readonly AppDbContext _context = context;

    public async Task<IList<User>> GetUsers()
    {
        return await _context.Users.ToListAsync();
    }
   
    public async Task<User?> GetUser(string username)
    {
        return await _context.Users
            .SingleOrDefaultAsync(u => u.Username == username);
    }

    public async Task<User> CreateUser(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }
}
