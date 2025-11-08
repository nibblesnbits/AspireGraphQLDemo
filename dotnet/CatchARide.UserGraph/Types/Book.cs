using CatchARide.Data.Books;
using CatchARide.Data.Books.Models;
using Microsoft.EntityFrameworkCore;

namespace CatchARide.UserGraph.Types;

public class BookObjectType : ObjectType<Book> {
    protected override void Configure(IObjectTypeDescriptor<Book> descriptor) {
        descriptor
            .Field(b => b.Id).ID();
        descriptor
            .ImplementsNode()
            .IdField(b => b.Id)
            .ResolveNode(async (context, id) => {
                var factory = context.Service<IDbContextFactory<BooksDbContext>>();
                using var dbContext = await factory.CreateDbContextAsync();
                return await dbContext.Books.FindAsync([id]);
            });

        descriptor
            .Field(b => b.Characters)
            .Resolve(ctx => {
                var book = ctx.Parent<Book>();
                var db = ctx.Service<BooksDbContext>();
                return db.Characters.Where(c => c.Books.Any(b => b.Id == book.Id));
            })
            .UsePaging<CharacterObjectType>()
            .UseSorting();
    }
}
