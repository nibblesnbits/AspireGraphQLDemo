namespace CatchARide.Data.Identity.Models;

public class Organization {
    public Guid OrganizationId { get; set; }
    public string Name { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; }

    // Navigation
    public ICollection<User> Users { get; set; } = new List<User>();
}
