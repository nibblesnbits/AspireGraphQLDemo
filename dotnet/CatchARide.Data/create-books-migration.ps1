dotnet ef migrations add $args[0] `
    --context BooksDbContext `
    --output-dir ./Books/Migrations `
    --project ./CatchARide.Data.csproj `
    --startup-project ../CatchARide.MigratorHelper/CatchARide.MigratorHelper.csproj `
    --verbose
