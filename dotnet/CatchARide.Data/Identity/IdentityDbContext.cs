using CatchARide.Data.Identity.Models;
using Microsoft.EntityFrameworkCore;

namespace CatchARide.Data.Identity;

public partial class IdentityDbContext(DbContextOptions<IdentityDbContext> options) : DbContext(options) {

    public virtual DbSet<User> Users { get; set; } = null!;
    public virtual DbSet<Role> Roles { get; set; } = null!;
    public virtual DbSet<UserRole> UserRoles { get; set; } = null!;
    public virtual DbSet<Organization> Organizations { get; set; } = null!;
    public virtual DbSet<AuditLog> AuditLogs { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        base.OnModelCreating(modelBuilder);

        // User configuration
        modelBuilder.Entity<User>(entity => {
            entity.ToTable("users");
            entity.HasKey(e => e.UserId);

            entity.Property(e => e.Email)
                .HasColumnType("citext")
                .IsRequired()
                .HasMaxLength(255);
            entity.Property(e => e.Username)
                .HasColumnType("citext")
                .HasMaxLength(100);

            entity.HasIndex(e => e.Email)
                .IsUnique()
                .HasDatabaseName("ix_users_email");
            entity.HasIndex(e => e.OrganizationId)
                .HasDatabaseName("ix_users_organization_id");

            entity.HasOne(e => e.Organization)
                .WithMany(o => o.Users)
                .HasForeignKey(e => e.OrganizationId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // Role configuration
        modelBuilder.Entity<Role>(entity => {
            entity.ToTable("roles");
            entity.HasKey(e => e.RoleId);

            entity.Property(e => e.Name)
                .HasColumnType("citext")
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasMaxLength(500);

            entity.HasIndex(e => e.Name)
                .IsUnique()
                .HasDatabaseName("ix_roles_name");

            // Store enum as string for better readability
            entity.Property(e => e.PhiAccessLevel)
                .HasConversion<string>()
                .HasMaxLength(50);
        });

        // UserRole configuration (many-to-many)
        modelBuilder.Entity<UserRole>(entity => {
            entity.ToTable("user_roles");
            entity.HasKey(e => new { e.UserId, e.RoleId });

            entity.HasIndex(e => e.UserId).HasDatabaseName("ix_user_roles_user_id");
            entity.HasIndex(e => e.RoleId).HasDatabaseName("ix_user_roles_role_id");

            entity.HasOne(e => e.User)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(e => e.RoleId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Organization configuration
        modelBuilder.Entity<Organization>(entity => {
            entity.ToTable("organizations");
            entity.HasKey(e => e.OrganizationId);

            entity.Property(e => e.Name)
                .HasColumnType("citext")
                .IsRequired()
                .HasMaxLength(255);

            entity.HasIndex(e => e.Name)
                .HasDatabaseName("ix_organizations_name");
            entity.HasIndex(e => e.IsActive)
                .HasDatabaseName("ix_organizations_is_active");
        });

        // AuditLog configuration
        modelBuilder.Entity<AuditLog>(entity => {
            entity.ToTable("audit_logs");
            entity.HasKey(e => e.LogId);

            entity.Property(e => e.Action)
                .HasColumnType("citext")
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.ResourceType)
                .HasColumnType("citext")
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.ResourceId)
                .HasColumnType("citext")
                .HasMaxLength(100);
            entity.Property(e => e.IpAddress)
                .HasMaxLength(45); // IPv6 max length

            // Store enum as string
            entity.Property(e => e.Outcome)
                .HasConversion<string>()
                .HasMaxLength(50);

            // JSON column for metadata (PostgreSQL)
            entity.Property(e => e.Metadata).HasColumnType("jsonb");

            entity.HasIndex(e => e.Timestamp)
                .HasDatabaseName("ix_audit_logs_timestamp");
            entity.HasIndex(e => new { e.ResourceType, e.ResourceId })
                .HasDatabaseName("ix_audit_logs_resource_type_resource_id");
            entity.HasIndex(e => e.UserId)
                .HasDatabaseName("ix_audit_logs_user_id");

            entity.HasOne(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
