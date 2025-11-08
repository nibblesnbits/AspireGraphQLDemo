using Demo.Data.Books;
using Demo.Data.Books.Models;
using Microsoft.EntityFrameworkCore;

namespace Demo.UserGraph.DataLoaders;

// Groups results by normalized search text so it can power autocomplete.
public sealed class BooksByTitleSearchDataLoader(
    IDbContextFactory<BooksDbContext> dbContextFactory,
    IBatchScheduler batchScheduler,
    DataLoaderOptions options) : GroupedDataLoader<string, Book>(batchScheduler, options) {

    protected override async Task<ILookup<string, Book>> LoadGroupedBatchAsync(
    IReadOnlyList<string> keys,
    CancellationToken cancellationToken) {
        await using var db = await dbContextFactory.CreateDbContextAsync(cancellationToken);

        // Normalize inputs once and deduplicate
        var normalized = keys
            .Where(s => !string.IsNullOrWhiteSpace(s))
            .Select(s => s.Trim())
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToArray();

        if (normalized.Length == 0) {
            return Enumerable.Empty<Book>().ToLookup(_ => string.Empty);
        }

        // Search by Name using case-insensitive contains for demo purposes
        var query = db.Books.AsNoTracking();
        var results = new List<(string Key, Book Book)>();
        foreach (var term in normalized) {
            var matches = await query
                .Where(a => EF.Functions.Like(a.Title, $"%{term}%"))
                .OrderBy(a => a.Title)
                .Take(Options.MaxBatchSize)
                .ToListAsync(cancellationToken);
            results.AddRange(matches.Select(a => (term, a)));
        }

        return results.ToLookup(t => t.Key, t => t.Book, StringComparer.OrdinalIgnoreCase);
    }
}
