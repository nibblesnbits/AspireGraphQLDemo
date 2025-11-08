using System.Net.Http.Headers;
using System.Net.Mime;
using CatchARide.Auth.Web;
using CatchARide.AuthApi;
using CatchARide.Data.Identity;
using Confluent.Kafka;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using Precision.Kafka;
using Precision.WarpCache.Grpc.Client;
using CatchARide.Configuration.Extensions;
using CatchARide.Auth;
using CatchARide.Kafka;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.AddNpgsqlDataSource(connectionName: "identity");
builder.Services.AddPooledDbContextFactory<IdentityDbContext>((sp, opts) => {
    var dataSource = sp.GetRequiredService<NpgsqlDataSource>();
    opts.UseNpgsql(dataSource);
});

builder.Services.AddProblemDetails();

builder.Services.AddExceptionHandler(o =>
    o.ExceptionHandler = async context => {
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        context.Response.ContentType = MediaTypeNames.Application.Json;
        var error = context.Features.Get<IExceptionHandlerFeature>();
        await context.Response.WriteAsJsonAsync(new ErrorResponse(
            error?.Error.Message ?? "Unknown error",
            context.RequestServices.GetRequiredService<IWebHostEnvironment>().IsDevelopment()
            ? error?.Error.StackTrace
            : null), ErrorResponseSerializerContext.Default.ErrorResponse);
    });

builder.Services.AddWarpCacheClient(
    builder.Configuration.GetCacheServerAddress(),
    StringMessageSerializerContext.Default.String);

builder.Services.AddLogging(configure => configure
        .AddSimpleConsole(o =>
            o.SingleLine = !builder.Environment.IsDevelopment()));

builder.Services.AddSingleton<KafkaMessageProducer<NotificationKey, NotificationEvent>>(sp =>
    new NotificationEventProducer(Topics.Notifications, new ProducerConfig {
        BootstrapServers = sp.GetRequiredService<IConfiguration>().GetKafkaBrokerList()
    }));

builder.Services.AddTransient<IOtpVerifier, OtpVerifier>();

builder.Services.AddHttpClient<ITokenClient, OidcTokenClient>(client => {
    client.BaseAddress = new Uri(builder.Configuration.GetOidcServerAuthUrl());
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(MediaTypeNames.Application.Json));
});

builder.Services.AddHealthChecks();

var app = builder.Build();

if (builder.Environment.IsDevelopment()) {
    app.UseForwardedHeaders(new ForwardedHeadersOptions {
        ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto | ForwardedHeaders.XForwardedHost
    });
}

app.UseExceptionHandler();

app.MapHealthChecks("/health");

app.MapGet("/otp", Handlers.GenerateOtp);
app.MapPost("/otp", Handlers.ValidateOtp);
app.MapGet("/login", Handlers.OAuthLogin);
app.MapGet("/redirect", Handlers.OAuthRedirect);

await app.RunAsync();
