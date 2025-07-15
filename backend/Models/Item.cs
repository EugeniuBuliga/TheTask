using System.Text.Json.Serialization;

namespace Backend.Models;

public class Item
{
    public int Id { get; set; }
    public string Description { get; set; } = string.Empty;

    public int UserId { get; set; }

    [JsonIgnore]
    public User User { get; set; } = null!;
}
