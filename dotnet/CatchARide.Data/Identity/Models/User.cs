namespace CatchARide.Data.Identity.Models;

public class User {
    public Guid UserId { get; set; }
    public string Email { get; set; } = string.Empty;
    public string? Username { get; set; }
    public Guid OrganizationId { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; }
    public DateTime? LastLoginAt { get; set; }

    // Navigation
    public Organization Organization { get; set; } = null!;
    public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}
