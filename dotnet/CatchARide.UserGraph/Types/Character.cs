using CatchARide.Data.Books;
using CatchARide.Data.Books.Models;
using Microsoft.EntityFrameworkCore;

namespace CatchARide.UserGraph.Types;

public class CharacterObjectType : ObjectType<Character> {
    protected override void Configure(IObjectTypeDescriptor<Character> descriptor) {
        descriptor
            .ImplementsNode()
            .IdField(f => f.Id)
            .ResolveNode(async (context, id) => {
                var factory = context.Service<IDbContextFactory<BooksDbContext>>();
                using var dbContext = await factory.CreateDbContextAsync();
                return await dbContext.Characters.FindAsync([id]);
            });
    }
}
