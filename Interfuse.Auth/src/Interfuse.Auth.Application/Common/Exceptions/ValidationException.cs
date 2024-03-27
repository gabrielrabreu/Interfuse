using FluentValidation.Results;
using Microsoft.AspNetCore.Identity;

namespace Interfuse.Auth.Application.Common.Exceptions
{
    public class ValidationException : Exception
    {
        public ValidationException()
            : base("One or more validation failures have occurred.")
        {
            Errors = new Dictionary<string, string[]>();
        }

        public ValidationException(IEnumerable<ValidationFailure> failures)
            : this()
        {
            Errors = failures
                .GroupBy(e => e.PropertyName, e => e.ErrorMessage)
                .ToDictionary(k => k.Key, k => k.ToArray());
        }

        public ValidationException(IdentityResult identityResult)
            : this()
        {
            Errors = identityResult.Errors
                .GroupBy(e => e.Code, e => e.Description)
                .ToDictionary(k => k.Key, k => k.ToArray());
        }

        public IDictionary<string, string[]> Errors { get; }
    }
}
