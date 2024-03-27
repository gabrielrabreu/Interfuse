using Interfuse.Auth.Application.Common.Exceptions;
using Interfuse.Auth.Domain.Entites;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Interfuse.Auth.Application.Commands
{
    public record SignUpCommand : IRequest
    {
        public string? UserName { get; init; }
        public string? Email { get; init; }
        public string? Password { get; init; }
    }

    public class SignUpCommandHandler(UserManager<ApplicationUser> userManager) : IRequestHandler<SignUpCommand>
    {
        public async Task Handle(SignUpCommand request, CancellationToken cancellationToken)
        {
            var user = new ApplicationUser
            {
                UserName = request.UserName!,
                Email = request.Email!,
            };

            var result = await userManager.CreateAsync(user, request.Password!);

            if (!result.Succeeded)
                throw new ValidationException(result);
        }
    }
}
