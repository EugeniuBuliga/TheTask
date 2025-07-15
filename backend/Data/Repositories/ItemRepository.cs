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
    public async Task<Item?> GetById(int id)
    {
        return await _context.TodoItems.FindAsync(id);
    }

    public async Task<Item> Add(Item item)
    {
        _context.TodoItems.Add(item);
        await _context.SaveChangesAsync();
        return item;
    }

    public async Task<bool> Update(Item item)
    {
        _context.TodoItems.Update(item);
        var updated = await _context.SaveChangesAsync();
        return updated > 0;
    }

    public async Task<bool> Delete(Item item)
    {
        _context.TodoItems.Remove(item);
        var deleted = await _context.SaveChangesAsync();
        return deleted > 0;
    }
}
