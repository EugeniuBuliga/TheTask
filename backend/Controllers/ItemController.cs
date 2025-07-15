using Backend.Data.Repositories;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ItemController(IUserRepository userRepository, ItemRepository itemRepository) : ControllerBase
{
    private readonly IUserRepository _userRepository = userRepository;
    private readonly ItemRepository _itemRepository = itemRepository;

    private async Task<User?> GetAuthenticatedUser()
    {
        var username = User.FindFirst(ClaimTypes.Name)?.Value;
        return await _userRepository.GetUser(username);
    }

    [HttpGet]
    public async Task<IActionResult> GetTasks()
    {
        var user = await GetAuthenticatedUser();
        if (user == null) return Unauthorized();

        var tasks = await _itemRepository.GetTasksByUser(user);
        return Ok(tasks.Select(t => new ItemResponseDto
        {
            Id = t.Id,
            Description = t.Description
        }));
    }

    [HttpPost]
    public async Task<IActionResult> AddTask([FromBody] ItemDto dto)
    {
        var user = await GetAuthenticatedUser();
        if (user == null) return Unauthorized();

        var item = new Item
        {
            Description = dto.Description,
            UserId = user.Id
        };

        var created = await _itemRepository.Add(item);
        return CreatedAtAction(nameof(GetTasks), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(int id, [FromBody] ItemDto dto)
    {
        var user = await GetAuthenticatedUser();
        if (user == null) return Unauthorized();

        var existing = await _itemRepository.GetById(id);
        if (existing == null || existing.UserId != user.Id)
            return NotFound();

        existing.Description = dto.Description;
        var updated = await _itemRepository.Update(existing);
        return updated ? Ok(existing) : StatusCode(500, "Update failed");
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        var user = await GetAuthenticatedUser();
        if (user == null) return Unauthorized();

        var existing = await _itemRepository.GetById(id);
        if (existing == null || existing.UserId != user.Id)
            return NotFound();

        var deleted = await _itemRepository.Delete(existing);
        return deleted ? Ok(new AuthResponseDto { Message = "Deleted" }): StatusCode(500, "Delete failed");

    }
}

