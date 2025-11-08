using CatchARide.Data.Books;
using CatchARide.UserGraph.DataLoaders;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.AddRedisClient(connectionName: "cache");

builder.AddNpgsqlDataSource(connectionName: "books");
builder.Services.AddDbContextFactory<BooksDbContext>((sp, opts) => {
    var dataSource = sp.GetRequiredService<NpgsqlDataSource>();
    opts.UseNpgsql(dataSource);
});

builder
    .AddGraphQL()
    .RegisterDbContextFactory<BooksDbContext>()
    .AddTypes()
    .AddDataLoader<AuthorsByNameSearchDataLoader>()
    .AddDbContextCursorPagingProvider()
    .AddSorting()
    .AddMutationConventions()
    .AddGlobalObjectIdentification()
    .AddRedisSubscriptions(s =>
        s.GetRequiredService<IConnectionMultiplexer>())
    .InitializeOnStartup();

var app = builder.Build();

app.UseWebSockets();

app.MapGet("/health", () => Results.Ok());

app.MapGraphQL();

app.RunWithGraphQLCommands(args);

