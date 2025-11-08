using CatchARide.Data.Books;
using CatchARide.Data.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace CatchARide.MigratorHelper;

public class Program {
    public static void Main(string[] args)
        => CreateHostBuilder(args).Build().Run();

    public static IHostBuilder CreateHostBuilder(string[] args)
        => Host.CreateDefaultBuilder(args)
        .ConfigureAppConfiguration(c => c.AddEnvironmentVariables())
        .ConfigureServices((context, services) => {
            services.AddDbContext<BooksDbContext>(o =>
                o.UseNpgsql(context.Configuration.GetConnectionString("books")));
            services.AddDbContext<IdentityDbContext>(o =>
                o.UseNpgsql(context.Configuration.GetConnectionString("identity")));
        });
}


