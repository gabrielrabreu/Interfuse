using Interfuse.Auth.Api.Infrastructure;
using Interfuse.Auth.Application.Commands;
using Interfuse.Auth.Application.Common.Models;
using Interfuse.Auth.Application.Queries;
using MediatR;

namespace Interfuse.Auth.Api.Endpoints
{
    public class Users : EndpointGroupBase
    {
        public override void Map(WebApplication app)
        {
            app.MapGroup(this)
                .MapPost(SignUp, "/signup");

            app.MapGroup(this)
                .MapGet(GetUsers)
                .RequireAuthorization(policy => policy.RequireRole("Admin"));
        }

        public Task SignUp(ISender sender, SignUpCommand command)
        {
            return sender.Send(command);
        }

        public Task<PaginatedList<UserBriefDto>> GetUsers(ISender sender, [AsParameters] GetUsersQuery query)
        {
            return sender.Send(query);
        }
    }
}
