using Interfuse.Auth.Domain.Entites;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Interfuse.Auth.Application.Commands
{
    public record RevokeTokensCommand : IRequest
    {
    }

    public class RevokeTokensCommandHandler(UserManager<ApplicationUser> userManager) : IRequestHandler<RevokeTokensCommand>
    {
        public async Task Handle(RevokeTokensCommand request, CancellationToken cancellationToken)
        {
            var users = await userManager.Users.ToListAsync();

            foreach (var user in users)
            {
                user.RefreshToken = null;
                user.RefreshTokenExpiryTime = null;
                await userManager.UpdateAsync(user);
            }
        }
    }
}
