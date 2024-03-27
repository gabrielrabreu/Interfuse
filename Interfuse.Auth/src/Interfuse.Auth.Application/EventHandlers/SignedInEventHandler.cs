using Interfuse.Auth.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Interfuse.Auth.Application.EventHandlers
{
    public class SignedInEventHandler(ILogger<SignedInEventHandler> logger) : INotificationHandler<SignedInEvent>
    {
        public Task Handle(SignedInEvent @event, CancellationToken cancellationToken)
        {
            logger.LogInformation("Domain Event: {DomainEvent}", @event.GetType().Name);

            return Task.CompletedTask;
        }
    }
}
