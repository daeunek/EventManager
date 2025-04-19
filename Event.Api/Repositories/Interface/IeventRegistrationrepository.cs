using Models;

namespace Repositories.Interface
{
    public interface IEventRegistrationRepository
    {
        Task<EventRegistration> RegisterForEventAsync(EventRegistration registration);

        Task<IEnumerable<EventRegistration>> GetUserRegistrationsAsync(string userId);
        Task<bool> UserHasRegisteredForEventAsync(Guid eventId, string userId);
        Task<int> GetEventRegistrationCountAsync(Guid eventId);
        Task<EventRegistration?> CancelRegistrationAsync(Guid eventId, string userId);

        // Get all registrations for an event (for admin)
        Task<IEnumerable<EventRegistration>> GetAllRegistrationsforEvent(Guid eventId);

        // Add to IEventRegistrationRepository
        Task<EventRegistration> GetRegistrationByIdAsync(Guid registrationId);
        Task<EventRegistration?> GetRegistrationDetails(Guid eventId, string userId);
    }
}