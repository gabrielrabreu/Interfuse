using Interfuse.Auth.Application.Common.Mappings;
using Interfuse.Auth.Application.Common.Models;
using Interfuse.Auth.Domain.Entites;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Interfuse.Auth.Application.Queries
{
    public record UserBriefDto(Guid Id, string? UserName, string? Email);

    public record GetUsersQuery : IRequest<PaginatedList<UserBriefDto>>
    {
        public int PageNumber { get; init; } = 1;
        public int PageSize { get; init; } = 10;
    }

    public class GetUsersQueryHandler(UserManager<ApplicationUser> userManager) : IRequestHandler<GetUsersQuery, PaginatedList<UserBriefDto>>
    {
        public async Task<PaginatedList<UserBriefDto>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
        {
            return await userManager.Users
                .OrderBy(x => x.UserName)
                .Select(x => new UserBriefDto(x.Id, x.UserName, x.Email))
                    .PaginatedListAsync(request.PageNumber, request.PageSize);
        }
    }
}
