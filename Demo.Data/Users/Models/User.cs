namespace Demo.Data.Users.Models;

public partial class User {
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Subject { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public virtual Admin? Admin { get; set; }
}
