using Interfuse.Auth.Domain.Entites;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Interfuse.Auth.Infrastructure.Data
{
    public static class InitialiserExtensions
    {
        public static async Task InitialiseDatabaseAsync(this WebApplication app)
        {
            using var scope = app.Services.CreateScope();
            var initialiser = scope.ServiceProvider.GetRequiredService<ApplicationDbContextInitialiser>();
            await initialiser.InitialiseAsync();
            await initialiser.SeedAsync();
        }
    }

    public class ApplicationDbContextInitialiser(ILogger<ApplicationDbContextInitialiser> logger,
                                                 ApplicationDbContext context,
                                                 UserManager<ApplicationUser> userManager,
                                                 RoleManager<ApplicationRole> roleManager)
    {
        public async Task InitialiseAsync()
        {
            try
            {
                await context.Database.MigrateAsync();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while initialising the database.");
                throw;
            }
        }

        public async Task SeedAsync()
        {
            try
            {
                await TrySeedAsync();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while seeding the database.");
                throw;
            }
        }

        private async Task TrySeedAsync()
        {
            await EnsureRoleExistsAsync("Admin");
            await EnsureAdminUserExistsAsync();
        }

        private async Task EnsureRoleExistsAsync(string roleName)
        {
            if (!await roleManager.RoleExistsAsync(roleName))
            {
                var role = new ApplicationRole(roleName);
                await roleManager.CreateAsync(role);
            }
        }

        private async Task EnsureAdminUserExistsAsync()
        {
            var administrator = new ApplicationUser { UserName = "admin", Email = "administrator@localhost" };

            if (userManager.Users.All(u => u.UserName != administrator.UserName))
            {
                await userManager.CreateAsync(administrator, "Admin!123");
                await userManager.AddToRoleAsync(administrator, "Admin");
            }
        }
    }
}
