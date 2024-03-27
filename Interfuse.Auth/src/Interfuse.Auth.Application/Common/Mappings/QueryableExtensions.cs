using Interfuse.Auth.Application.Common.Models;
using Microsoft.EntityFrameworkCore;

namespace Interfuse.Auth.Application.Common.Mappings
{
    public static class QueryableExtensions
    {
        public static Task<PaginatedList<TDestination>> PaginatedListAsync<TDestination>(this IQueryable<TDestination> queryable, int pageNumber, int pageSize) where TDestination : class
            => PaginatedList<TDestination>.CreateAsync(queryable.AsNoTracking(), pageNumber, pageSize);
    }
}
