using Backend.Models;

namespace Backend.Data.Repositories;

public interface IItemRepository
{
    Task<IList<Item>> GetTasksByUser(User user);
}
