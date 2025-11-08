using Demo.Data.Books;
using Demo.Data.Books.Models;
using Microsoft.EntityFrameworkCore;

namespace Demo.UserGraph.Types;

public class AuthorObjectType : ObjectType<Author> {
    protected override void Configure(IObjectTypeDescriptor<Author> descriptor) {
        descriptor
            .ImplementsNode()
            .IdField(f => f.Id)
            .ResolveNode(async (context, id) => {
                var factory = context.Service<IDbContextFactory<BooksDbContext>>();
                using var dbContext = await factory.CreateDbContextAsync();
                var author = await dbContext.Authors.FindAsync([id]);
                await dbContext.Entry(author).Collection(a => a.Books).LoadAsync();
                return author;
            });
    }
}
