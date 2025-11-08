using Demo.Data.Books;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Demo.MigratorHelper;

public class Program {
    public static void Main(string[] args)
        => CreateHostBuilder(args).Build().Run();

    public static IHostBuilder CreateHostBuilder(string[] args)
        => Host.CreateDefaultBuilder(args)
        .ConfigureAppConfiguration(c => c.AddEnvironmentVariables())
        .ConfigureServices((context, services) => {
            services.AddDbContext<BooksDbContext>(o =>
                o.UseNpgsql(context.Configuration.GetConnectionString("books")));
        });
}


