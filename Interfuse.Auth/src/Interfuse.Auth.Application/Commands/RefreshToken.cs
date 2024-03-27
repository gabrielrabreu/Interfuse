using Interfuse.Auth.Application.Common.Interfaces;
using Interfuse.Auth.Domain.Entites;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Interfuse.Auth.Application.Commands
{
    public record RefreshTokenCommand : IRequest<TokenResult>
    {
        public string? AccessToken { get; init; }
        public string? RefreshToken { get; init; }
    }

    public class RefreshTokenCommandHandler(UserManager<ApplicationUser> userManager, IJwtService jwtService) : IRequestHandler<RefreshTokenCommand, TokenResult>
    {
        public async Task<TokenResult> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
        {
            var principal = jwtService.GetPrincipalFromExpiredToken(request.AccessToken);
            var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId != null)
            {
                var user = await userManager.FindByIdAsync(userId);

                if (user != null && user.RefreshToken == request.RefreshToken && user.RefreshTokenExpiryTime >= DateTime.UtcNow)
                {
                    var accessToken = jwtService.CreateToken(principal.Claims.ToList());
                    var refreshToken = jwtService.GenerateRefreshToken();
                    var refreshTokenExpiryTime = jwtService.RefreshTokenExpiryTime();

                    user.RefreshToken = refreshToken;
                    user.RefreshTokenExpiryTime = refreshTokenExpiryTime;

                    await userManager.UpdateAsync(user);

                    return new TokenResult(new JwtSecurityTokenHandler().WriteToken(accessToken),
                                           refreshToken,
                                           accessToken.ValidTo);
                }
            }


            throw new UnauthorizedAccessException();
        }
    }
}
