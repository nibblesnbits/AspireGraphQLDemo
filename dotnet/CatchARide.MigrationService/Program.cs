using CatchARide.Data.Books;
using CatchARide.Data.Identity;
using CatchARide.MigrationService;
using Microsoft.EntityFrameworkCore;
using Npgsql;

var builder = Host.CreateApplicationBuilder(args);
builder.AddServiceDefaults();
builder.Services.AddHostedService<Worker>();

builder.Services.AddOpenTelemetry()
    .WithTracing(tracing => tracing.AddSource(Worker.ActivitySourceName));

// Register distinct data sources for each database connection
builder.AddNpgsqlDataSource(connectionName: "books");
builder.AddNpgsqlDataSource(connectionName: "identity");

// Use the keyed data sources so each DbContext targets the correct database
builder.Services.AddDbContext<BooksDbContext>((sp, opts) => {
    var dataSource = sp.GetRequiredKeyedService<NpgsqlDataSource>("books");
    opts.UseNpgsql(dataSource);
});

builder.Services.AddDbContext<IdentityDbContext>((sp, opts) => {
    var dataSource = sp.GetRequiredKeyedService<NpgsqlDataSource>("identity");
    opts.UseNpgsql(dataSource);
});

var host = builder.Build();
host.Run();
