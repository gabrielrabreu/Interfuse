using Interfuse.Auth.Domain.Common;
using Interfuse.Auth.Domain.Entites;

namespace Interfuse.Auth.Domain.Events
{
    public record SignedInEvent(ApplicationUser User) : BaseEvent
    {
    }
}
