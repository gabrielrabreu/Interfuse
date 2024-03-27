﻿using Interfuse.Auth.Api.Infrastructure;
using System.Diagnostics.CodeAnalysis;

namespace Interfuse.Auth.Api.Infrastructure
{
    public static class IEndpointRouteBuilderExtensions
    {
        public static RouteHandlerBuilder MapGet(this IEndpointRouteBuilder builder, Delegate handler, [StringSyntax("Route")] string pattern = "")
        {
            return builder.MapGet(pattern, handler)
                .WithName(handler.Method.Name);
        }

        public static RouteHandlerBuilder MapPost(this IEndpointRouteBuilder builder, Delegate handler, [StringSyntax("Route")] string pattern = "")
        {
            return builder.MapPost(pattern, handler)
                .WithName(handler.Method.Name);
        }

        public static RouteHandlerBuilder MapPut(this IEndpointRouteBuilder builder, Delegate handler, [StringSyntax("Route")] string pattern)
        {
            return builder.MapPut(pattern, handler)
                .WithName(handler.Method.Name);
        }

        public static RouteHandlerBuilder MapDelete(this IEndpointRouteBuilder builder, Delegate handler, [StringSyntax("Route")] string pattern)
        {
            return builder.MapDelete(pattern, handler)
                .WithName(handler.Method.Name);
        }
    }
}
