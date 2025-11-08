using CatchARide.Data.Books;
using CatchARide.Data.Books.Models;
using CatchARide.UserGraph.DataLoaders;

namespace CatchARide.UserGraph.Types;

[QueryType]
public class Query {

    public async Task<Book?> GetBook([ID<Book>] Guid id, BooksDbContext dbContext) =>
        await dbContext.Books.FindAsync([id]);

    public IQueryable<Book> GetBooks(BooksDbContext dbContext) =>
        dbContext.Books;

    public IQueryable<Author> GetAuthors(BooksDbContext dbContext) =>
        dbContext.Authors;

    public async Task<Author?> GetAuthor([ID<Author>] Guid id, BooksDbContext dbContext) =>
        await dbContext.Authors.FindAsync([id]);

    [UsePaging(typeof(CharacterObjectType))]
    public IQueryable<Character> GetCharacters(BooksDbContext dbContext) =>
        dbContext.Characters;

    public async Task<Character?> GetCharacter([ID<Character>] int id, BooksDbContext dbContext) =>
        await dbContext.Characters.FindAsync([id]);

    [GraphQLName("searchAuthors")]
    [UseSorting]
    public async Task<IEnumerable<Author>> SearchAuthors(
        string search,
        AuthorsByNameSearchDataLoader loader,
        CancellationToken ct) {
        var result = await loader.LoadAsync(search, ct);
        return result;
    }

    [GraphQLName("searchBooks")]
    [UseSorting]
    public async Task<IEnumerable<Book>> SearchBooks(
        string search,
        BooksByTitleSearchDataLoader loader,
        CancellationToken ct) {
        var result = await loader.LoadAsync(search, ct);
        return result;
    }
}
