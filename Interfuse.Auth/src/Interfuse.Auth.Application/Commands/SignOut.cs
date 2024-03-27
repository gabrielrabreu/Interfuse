using Interfuse.Auth.Domain.Entites;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Interfuse.Auth.Application.Commands
{
    public record SignOutCommand(string UserId) : IRequest
    {
    }

    public class SignOutCommandHandler(UserManager<ApplicationUser> userManager) : IRequestHandler<SignOutCommand>
    {
        public async Task Handle(SignOutCommand request, CancellationToken cancellationToken)
        {
            var user = await userManager.FindByIdAsync(request.UserId);

            if (user != null)
            {
                user.RefreshToken = null;
                user.RefreshTokenExpiryTime = null;
                await userManager.UpdateAsync(user);
            }
        }
    }
}
