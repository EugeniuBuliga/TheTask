using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data.Repositories;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ItemController(IUserRepository userRepository, ItemRepository itemRepository) : ControllerBase
{
    private readonly IUserRepository _userRepository = userRepository;
    private readonly ItemRepository _ItemRepository = itemRepository;

    [HttpGet]
    public async Task<IActionResult> GetTasks(string username)
    {
        var user = await _userRepository.GetUser(username);
        if (user != null)
        {
            var tasks = await _ItemRepository.GetTasksByUser(user);
            return Ok(tasks);
        }
        return Ok($"Nothing found for user '{username}'");
    }
}
