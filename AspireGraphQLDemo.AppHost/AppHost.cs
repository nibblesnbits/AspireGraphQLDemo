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

var gateway = builder
    .AddFusionGateway<Projects.AspireGraphQLDemo_Gateway>("gateway")
    .WithSubgraph(booksGraph);

//builder.AddNpmApp("reactvite", "../web/vite-graphql")
//    .WithReference(gateway)
//    .WithWorkingDirectory("../web/vite-graphql")
//    .WithCommand("npm run dev")
//    .WithEnvironment("BROWSER", "none")
//    .WithHttpEndpoint(env: "VITE_PORT")
//    .WithExternalHttpEndpoints()
//    .PublishAsDockerFile();

builder.Build().Compose().Run();
