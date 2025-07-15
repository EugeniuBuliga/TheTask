using Backend.Data.Repositories;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IConfiguration config, IUserRepository repo) : ControllerBase
{
    private readonly IConfiguration _config = config;
    private readonly IUserRepository _userRepository = repo;

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserDto dto)
    {
        var hash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        var user = new User { Username = dto.Username, PasswordHash = hash };
        await _userRepository.CreateUser(user);
        return Ok(new AuthResponseDto { Name = dto.Username });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserDto dto)
    {
        var user = await _userRepository.GetUser(dto.Username);
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return Unauthorized("Invalid credentials");

        var token = GenerateJwt(user);
        return Ok(new AuthResponseDto { Token = token , Name = dto.Username });

    }

    private string GenerateJwt(User user)
    {
        var jwtSettings = _config.GetSection("Jwt");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username)
            };

        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            expires: DateTime.Now.AddMinutes(int.Parse(jwtSettings["ExpiresInMinutes"])),
             claims: claims,
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    [Authorize]
    [HttpGet("me")]
    public IActionResult Me()
    {
        var username = User.FindFirst(ClaimTypes.Name)?.Value;
        return Ok(new AuthResponseDto { Name = username });
    }

}
