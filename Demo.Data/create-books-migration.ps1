dotnet ef migrations add $args[0] `
    --context BooksDbContext `
    --output-dir ./Books/Migrations `
    --project ./Demo.Data.csproj `
    --startup-project ../Demo.MigratorHelper/Demo.MigratorHelper.csproj `
    --verbose
