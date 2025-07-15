using Backend.Models;

namespace Backend.Data.Repositories;

public interface IItemRepository
{
    Task<Item> Add(Item item);
    Task<bool> Delete(Item item);
    Task<Item?> GetById(int id);
    Task<IList<Item>> GetTasksByUser(User user);
    Task<bool> Update(Item item);
}
