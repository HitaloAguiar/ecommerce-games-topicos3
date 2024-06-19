using ecommerce_topicos3.Interfaces;
using ecommerce_topicos3.Mapping;
using ecommerce_topicos3.Models;
using ecommerce_topicos3.Repositories;
using ecommerce_topicos3.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<EcommerceContext>(options => {
    options.UseSqlServer(builder.Configuration.GetConnectionString("Ecommerce"));
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
options.SwaggerDoc("v1", new OpenApiInfo()
{
Version = "v1",
Title = "Slime Games",
Description = "Slime games"
});

options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
{
Name = "Authorization",
Type = SecuritySchemeType.ApiKey,
Scheme = "Bearer",
BearerFormat = "JWT",
In = ParameterLocation.Header,
Description = "Cadê o contexto?"
});

options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });

});


builder.Services.AddAuthentication(options =>
{

    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(options =>
{

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

builder.Services.AddCors(options =>
    options.AddPolicy(
        "ecommerce", policyBuilder =>
        {
            policyBuilder.WithOrigins("http://localhost:4200");
            policyBuilder.AllowAnyHeader();
            policyBuilder.AllowAnyMethod();
            //policyBuilder.AllowCredentials();
            policyBuilder.AllowAnyOrigin();
            policyBuilder.WithExposedHeaders("Authorization");
        }
        )

);

builder.Services.AddAutoMapper(typeof(EntitiesToDTOMappingProfile));

builder.Services.AddScoped<ITokenService, TokenService>();

builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();

builder.Services.AddScoped<IEstadoRepository, EstadoRepository>();

builder.Services.AddScoped<ICidadeRepository, CidadeRepository>();

builder.Services.AddScoped<IGameRepository, GameRepository>();

builder.Services.AddScoped<ICompraRepository, CompraRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.UseCors("ecommerce");

app.Run();
