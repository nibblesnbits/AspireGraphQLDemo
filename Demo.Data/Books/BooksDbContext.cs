using Demo.Data.Books.Models;
using Microsoft.EntityFrameworkCore;

namespace Demo.Data.Books;

public partial class BooksDbContext(DbContextOptions<BooksDbContext> options) : DbContext(options) {
    public virtual DbSet<Book> Books { get; set; }
    public virtual DbSet<Author> Authors { get; set; }
    public virtual DbSet<Character> Characters { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {

        modelBuilder.Entity<Book>(entity => {
            entity.ToTable("books");
            entity.HasKey(b => b.Id);

            entity.Property(b => b.Title)
                .HasColumnType("citext")
                .HasMaxLength(200)
                .IsRequired();

            entity.HasOne(b => b.Author)
                .WithMany(a => a.Books)
                .HasForeignKey("author_id")
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasMany(b => b.Characters)
                .WithMany(c => c.Books)
                .UsingEntity<Dictionary<string, object>>("book_characters",
                    join => join.HasOne<Character>()
                        .WithMany()
                        .HasForeignKey("character_id")
                        .OnDelete(DeleteBehavior.Cascade),
                    join => join.HasOne<Book>()
                        .WithMany()
                        .HasForeignKey("book_id")
                        .OnDelete(DeleteBehavior.Cascade),
                    je => {
                        je.HasKey("book_id", "character_id");
                        je.ToTable("book_characters");
                        je.HasIndex("character_id").HasDatabaseName("ix_book_characters_character_id");
                        je.HasIndex("book_id").HasDatabaseName("ix_book_characters_book_id");
                    });

            entity
                .HasIndex(b => b.Title)
                .HasDatabaseName("ix_books_title"); // btree index
            entity
                .HasIndex(b => b.Title)
                .HasDatabaseName("ix_books_title_trgm");
        });

        modelBuilder.Entity<Author>(entity => {
            entity.ToTable("authors");
            entity.HasKey(a => a.Id);

            entity
                .Property(a => a.Name)
                .HasColumnType("citext")
                .HasMaxLength(150)
                .IsRequired();

            entity
                .HasIndex(a => a.Name)
                .HasDatabaseName("ix_authors_name");
            entity
                .HasIndex(a => a.Name)
                .HasDatabaseName("ix_authors_name_trgm");
        });

        modelBuilder.Entity<Character>(entity => {
            entity.ToTable("characters");
            entity.HasKey(c => c.Id);

            entity.Property(c => c.Name)
                .HasColumnType("citext")
                .HasMaxLength(100)
                .IsRequired();

            entity
                .HasIndex(c => c.Name)
                .HasDatabaseName("ix_characters_name");
            entity
                .HasIndex(c => c.Name)
                .HasDatabaseName("ix_characters_name_trgm");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
