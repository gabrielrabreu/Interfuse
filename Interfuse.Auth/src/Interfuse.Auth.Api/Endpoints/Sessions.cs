using Interfuse.Auth.Api.Infrastructure;
using Interfuse.Auth.Application.Commands;
using Interfuse.Auth.Application.Common.Interfaces;
using MediatR;

namespace Interfuse.Auth.Api.Endpoints
{
    public class Sessions : EndpointGroupBase
    {
        public override void Map(WebApplication app)
        {
            app.MapGroup(this)
                .MapPost(SignIn, "/signin");

            app.MapGroup(this)
                .MapPost(SignOut, "/signout")
                .RequireAuthorization();

            app.MapGroup(this)
                .MapPost(RefreshToken, "/refresh");

            app.MapGroup(this)
                .MapDelete(RevokeTokens, "/revoke-all")
                .RequireAuthorization(policy => policy.RequireRole("Admin"));
        }

        public Task<TokenResult> SignIn(ISender sender, SignInCommand command)
        {
            return sender.Send(command);
        }

        public async Task<IResult> SignOut(ISender sender, IUser user)
        {
            await sender.Send(new SignOutCommand(user.UserId!));
            return Results.NoContent();
        }

        public Task<TokenResult> RefreshToken(ISender sender, RefreshTokenCommand command)
        {
            return sender.Send(command);
        }

        public Task RevokeTokens(ISender sender)
        {
            return sender.Send(new RevokeTokensCommand());
        }
    }
}
