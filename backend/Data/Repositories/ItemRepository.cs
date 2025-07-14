using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data.Repositories;

public class ItemRepository(AppDbContext context) : IItemRepository
{
    private readonly AppDbContext _context = context;
    public async Task<IList<Item>> GetTasksByUser(User user)
    {
        return await _context.TodoItems
            .Where(u => u.UserId == user.Id)
            .ToListAsync();
    }
}
