namespace CatchARide.Data.Identity.Models;

public class Role {
    public Guid RoleId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public PhiAccessLevel PhiAccessLevel { get; set; }
    public DateTime CreatedAt { get; set; }

    // Navigation
    public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}

public enum PhiAccessLevel {
    None = 0,
    Limited = 1,
    Full = 2
}
