using Microsoft.AspNetCore.Identity;

namespace Interfuse.Auth.Domain.Entites
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }
    }
}
