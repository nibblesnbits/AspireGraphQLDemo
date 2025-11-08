using Demo.Data.Books;
using Demo.Data.Books.Models;
using HotChocolate.Subscriptions;

namespace Demo.UserGraph.Types;

[MutationType]
public class Mutation {

    public async Task<Book> AddBook(BooksDbContext dbContext, BookInput input, CancellationToken cancellationToken) {
        if (await dbContext.Authors.FindAsync([input.AuthorId], cancellationToken) is not Author author) {
            throw new GraphQLException($"Author with ID '{input.AuthorId}' not found.");
        }
        var entity = dbContext.Books.Add(new Book { Title = input.Title, Id = Guid.NewGuid(), Author = author });
        await dbContext.SaveChangesAsync(cancellationToken);
        return entity.Entity;
    }

    public async Task<Author> AddAuthor(BooksDbContext dbContext, AuthorInput input, CancellationToken cancellationToken) {

        var entity = dbContext.Authors.Add(new Author { Name = input.Name, Id = Guid.NewGuid() });
        await dbContext.SaveChangesAsync(cancellationToken);
        return entity.Entity;
    }

    public async Task<Character> AddCharacter(ITopicEventSender subscriptionSender, BooksDbContext dbContext, CharacterInput input, CancellationToken cancellationToken) {
        if (await dbContext.Books.FindAsync([input.BookId], cancellationToken) is not Book book) {
            throw new GraphQLException($"Author with ID '{input.BookId}' not found.");
        }
        var entry = dbContext.Characters.Attach(new Character { Name = input.Name });
        book.Characters.Add(entry.Entity);
        await dbContext.SaveChangesAsync(cancellationToken);
        await subscriptionSender.SendAsync(nameof(Subscription.OnCharacterAdded), entry.Entity, cancellationToken);
        return entry.Entity;
    }
}

public record BookInput(string Title, [ID<Author>] Guid AuthorId);

public class BookInputType : InputObjectType<BookInput> {

    override protected void Configure(IInputObjectTypeDescriptor<BookInput> descriptor) {
        descriptor.Field(f => f.Title).Type<NonNullType<StringType>>();
        descriptor.Field(f => f.AuthorId).ID<Author>();
    }
}

public record AuthorInput(string Name);

public class AuthorInputType : InputObjectType<AuthorInput>;

public record CharacterInput(string Name, [ID<Book>] Guid BookId);

public class CharacterInputType : InputObjectType<CharacterInput> {
    override protected void Configure(IInputObjectTypeDescriptor<CharacterInput> descriptor) {
        descriptor.Field(f => f.Name).Type<NonNullType<StringType>>();
        descriptor.Field(f => f.BookId).ID<Book>();
    }
}
