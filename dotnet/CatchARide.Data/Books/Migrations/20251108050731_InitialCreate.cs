using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace CatchARide.Data.Books.Migrations {
    /// <inheritdoc />
    public partial class InitialCreate : Migration {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:PostgresExtension:citext", ",,");

            migrationBuilder.CreateTable(
                name: "authors",
                columns: table => new {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "citext", maxLength: 150, nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("PK_authors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "characters",
                columns: table => new {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "citext", maxLength: 100, nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("PK_characters", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "books",
                columns: table => new {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "citext", maxLength: 200, nullable: false),
                    author_id = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table => {
                    table.PrimaryKey("PK_books", x => x.Id);
                    table.ForeignKey(
                        name: "FK_books_authors_author_id",
                        column: x => x.author_id,
                        principalTable: "authors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "book_characters",
                columns: table => new {
                    book_id = table.Column<Guid>(type: "uuid", nullable: false),
                    character_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("PK_book_characters", x => new { x.book_id, x.character_id });
                    table.ForeignKey(
                        name: "FK_book_characters_books_book_id",
                        column: x => x.book_id,
                        principalTable: "books",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_book_characters_characters_character_id",
                        column: x => x.character_id,
                        principalTable: "characters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_authors_name_trgm",
                table: "authors",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "ix_book_characters_book_id",
                table: "book_characters",
                column: "book_id");

            migrationBuilder.CreateIndex(
                name: "ix_book_characters_character_id",
                table: "book_characters",
                column: "character_id");

            migrationBuilder.CreateIndex(
                name: "IX_books_author_id",
                table: "books",
                column: "author_id");

            migrationBuilder.CreateIndex(
                name: "ix_books_title_trgm",
                table: "books",
                column: "Title");

            migrationBuilder.CreateIndex(
                name: "ix_characters_name_trgm",
                table: "characters",
                column: "Name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropTable(
                name: "book_characters");

            migrationBuilder.DropTable(
                name: "books");

            migrationBuilder.DropTable(
                name: "characters");

            migrationBuilder.DropTable(
                name: "authors");
        }
    }
}
