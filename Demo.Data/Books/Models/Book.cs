namespace Demo.Data.Books.Models;

public partial class Book {
    public Guid Id { get; set; }
    public string? Title { get; set; } = null!;
    public Author? Author { get; set; } = null!;
    public virtual ICollection<Character> Characters { get; set; } = new List<Character>();
}
