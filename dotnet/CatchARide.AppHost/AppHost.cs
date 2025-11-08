var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres");
var identityDb = postgres.AddDatabase("identity");

var cache = builder.AddRedis("cache");

var kafka = builder.AddKafka("kafka");

var migrations = builder.AddProject<Projects.CatchARide_MigrationService>("migrations")
    .WithReference(identityDb)
    .WaitFor(identityDb);

//var booksGraph = builder.AddProject<Projects.CatchARide_UserGraph>("booksGraph")
//    .WithReference(cache)
//    .WithReference(booksDb)
//    .WithReference(migrations)
//    .WaitForCompletion(migrations)
//    .WithHttpHealthCheck("/health");

var authApi = builder.AddProject<Projects.CatchARide_AuthApi>("authApi")
    .WithReference(cache)
    .WithReference(identityDb)
    .WithReference(migrations)
    .WithReference(kafka)
    .WaitForCompletion(migrations)
    .WithHttpHealthCheck("/health");

//var gateway = builder
//    .AddFusionGateway<Projects.CatchARide_Gateway>("gateway")
//    .WithSubgraph(booksGraph)
//    .WithReference(cache);

//builder.AddNpmApp("frontend", "../web/vite-graphql")
//    .WithReference(gateway)
//    .WithReference(authApi)
//    .WithEnvironment("BROWSER", "none")
//    .WithHttpEndpoint(env: "VITE_PORT")
//    .WithExternalHttpEndpoints()
//    .PublishAsDockerFile();

builder.Build()/*.Compose()*/.Run();
