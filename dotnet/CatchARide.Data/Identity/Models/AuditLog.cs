namespace CatchARide.Data.Identity.Models;

public class AuditLog {
    public Guid LogId { get; set; }
    public DateTime Timestamp { get; set; }
    public Guid UserId { get; set; }
    public string Action { get; set; } = string.Empty;
    public string ResourceType { get; set; } = string.Empty;
    public string? ResourceId { get; set; }
    public AuditOutcome Outcome { get; set; }
    public string? IpAddress { get; set; }
    public string? Metadata { get; set; } // JSON

    // Navigation
    public User User { get; set; } = null!;
}

public enum AuditOutcome {
    Success,
    Denied,
    Error
}
