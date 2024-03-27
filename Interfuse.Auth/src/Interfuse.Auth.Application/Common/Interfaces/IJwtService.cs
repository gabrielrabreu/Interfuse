using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Interfuse.Auth.Application.Common.Interfaces
{
    public interface IJwtService
    {
        JwtSecurityToken CreateToken(IList<Claim> claims);
        string GenerateRefreshToken();
        ClaimsPrincipal GetPrincipalFromExpiredToken(string? token);
        DateTime RefreshTokenExpiryTime();
    }
}
