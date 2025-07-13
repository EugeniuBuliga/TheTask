using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Repositories;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserRepository _userRepository;

    public UserController(IUserRepository repo)
    {
        _userRepository = repo;
    }

    [HttpGet("ping")]
    public IActionResult Ping()
    {
        var msg = "pong ";
        var times = new Random().Next(1,6);
        return Ok(new { message = string.Concat(Enumerable.Repeat(msg, times)) });
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] User user)
    {
        var created = await _userRepository.CreateUserAsync(user);
        return Ok(created);
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _userRepository.GetUsersAsync();
        return Ok(users);
    }
}
