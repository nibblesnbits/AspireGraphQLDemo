var builder = DistributedApplication.CreateBuilder(args);


var postgres = builder.AddPostgres("postgres");
var booksDb = postgres.AddDatabase("books");

var cache = builder.AddRedis("cache");

var migrations = builder.AddProject<Projects.Demo_MigrationService>("migrations")
    .WithReference(booksDb)
    .WaitFor(booksDb);

var booksGraph = builder.AddProject<Projects.Demo_UserGraph>("booksGraph")
    .WithReference(cache)
    .WithReference(booksDb)
    .WithReference(migrations)
    .WaitForCompletion(migrations)
    .WithHttpHealthCheck("/health");

builder
    .AddFusionGateway<Projects.AspireGraphQLDemo_Gateway>("gateway")
    .WithSubgraph(booksGraph);

builder.Build().Compose().Run();
