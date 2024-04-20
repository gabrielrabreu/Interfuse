using Interfuse.Auth.Application.Common.Interfaces;
using Interfuse.Auth.Domain.Entites;
using Interfuse.Auth.Domain.Events;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Interfuse.Auth.Application.Commands
{
    public record TokenUserResult(string? UserName, string? Language);

    public record TokenResult(string AccessToken, string RefreshToken, DateTime Expiration, TokenUserResult User);

    public record SignInCommand : IRequest<TokenResult>
    {
        public string? UserName { get; init; }
        public string? Password { get; init; }
    }

    public class SignInCommandHandler(UserManager<ApplicationUser> userManager, IPublisher publisher, IJwtService jwtService) : IRequestHandler<SignInCommand, TokenResult>
    {
        public async Task<TokenResult> Handle(SignInCommand request, CancellationToken cancellationToken)
        {
            var user = await userManager.FindByNameAsync(request.UserName!);

            if (user != null && await userManager.CheckPasswordAsync(user, request.Password!))
            {
                var claims = new List<Claim>
                {
                    new(ClaimTypes.Name, user.UserName!),
                    new(ClaimTypes.NameIdentifier, user.Id.ToString())
                };

                var roles = await userManager.GetRolesAsync(user);
                foreach (var role in roles)
                    claims.Add(new Claim(ClaimTypes.Role, role));

                var accessToken = jwtService.CreateToken(claims);
                var refreshToken = jwtService.GenerateRefreshToken();
                var refreshTokenExpiryTime = jwtService.RefreshTokenExpiryTime();

                user.RefreshToken = refreshToken;
                user.RefreshTokenExpiryTime = refreshTokenExpiryTime;

                await userManager.UpdateAsync(user);

                await publisher.Publish(new SignedInEvent(user), cancellationToken);

                return new TokenResult(new JwtSecurityTokenHandler().WriteToken(accessToken),
                                       refreshToken,
                                       accessToken.ValidTo,
                                       new TokenUserResult(user.UserName, "en"));
            }

            throw new UnauthorizedAccessException();
        }
    }
}
