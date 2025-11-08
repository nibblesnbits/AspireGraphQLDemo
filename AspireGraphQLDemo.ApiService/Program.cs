using Demo.Data.Books;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.AddNpgsqlDataSource(connectionName: "books");

var connectionString =
    builder.Configuration.GetConnectionString("books")
    ?? builder.Configuration["ConnectionStrings:books"];

builder.Services.AddDbContext<BooksDbContext>(options => {
    options.UseNpgsql(connectionString);
});

builder.Services.AddProblemDetails();

var app = builder.Build();

app.MapGet("/health", () => Results.Ok());

app.MapGet("/authors", (BooksDbContext dbContext) =>
    Results.Ok(dbContext.Authors.ToArray()));

app.MapDefaultEndpoints();

app.Run();
