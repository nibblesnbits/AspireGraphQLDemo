using CatchARide.Data.Books;
using CatchARide.Data.Books.Models;

namespace CatchARide.UserGraph.Types;

[SubscriptionType]
public class Subscription {

    [Subscribe(MessageType = typeof(Character))]
    public async Task<Book?> OnCharacterAdded([ID<Book>] Guid? bookId, [EventMessage] Character character, BooksDbContext dbContext) {
        if (bookId is null) {
            return default;
        }

        var book = await dbContext.Books.FindAsync([bookId]);
        if (book is null) {
            return default;
        }

        if (book.Characters.Count == 0) {
            await dbContext.Entry(book).Collection(b => b.Characters).LoadAsync();
        }

        return book;
    }
}
