dotnet ef migrations add $args[0] `
    --context IdentityDbContext `
    --output-dir ./Identity/Migrations `
    --project ./CatchARide.Data.csproj `
    --startup-project ../CatchARide.MigratorHelper/CatchARide.MigratorHelper.csproj `
    --verbose
