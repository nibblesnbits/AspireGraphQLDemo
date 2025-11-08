using Demo.Data.Users.Models;
using Microsoft.EntityFrameworkCore;

namespace Demo.Data.Users;

public partial class UserDbContext(DbContextOptions<UserDbContext> options) : DbContext(options) {
    public virtual DbSet<Admin> Admins { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {

        modelBuilder.Entity<Admin>(entity => {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id)
                .ValueGeneratedNever();

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.Admin)
                .HasForeignKey<Admin>(d => d.Id)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<User>(entity => {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id)
                .ValueGeneratedNever();

            entity.Property(e => e.Name)
                .HasMaxLength(100);
            entity.Property(e => e.Subject)
                .HasMaxLength(50);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(15);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
