using Models;
using Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using Data;

namespace Repositories.Implementation
{
    public class EventRegistrationRepository : IEventRegistrationRepository
    {
        private readonly ApplicationDbContext dbContext;

        public EventRegistrationRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<EventRegistration> RegisterForEventAsync(EventRegistration registration)
        {
            await dbContext.EventRegistrations.AddAsync(registration);
            await dbContext.SaveChangesAsync();
            return registration;
        }

        // This is used to show the list of events a user has registered for
        public async Task<IEnumerable<EventRegistration>> GetUserRegistrationsAsync(string userId)
        {
            return await dbContext.EventRegistrations
                .Include(e => e.Event)
                .Where(e => e.UserId == userId)
                .ToListAsync();
        }

        public async Task<EventRegistration?> CancelRegistrationAsync(Guid eventId, string userId)
        {
            var registration = await dbContext.EventRegistrations
                .FirstOrDefaultAsync(e => e.EventId == eventId && e.UserId == userId);
            
            if (registration != null){
                dbContext.EventRegistrations.Remove(registration);
                await dbContext.SaveChangesAsync();
                return registration;
            }
            else
            {
                return null;
            }
        }

        // get the number of registrations for an event
        public async Task<int> GetEventRegistrationCountAsync(Guid eventId)
        {
            return await dbContext.EventRegistrations
                .CountAsync(er => er.EventId == eventId);
        }

        //get admin event regirstation userrs
        public async Task<IEnumerable<EventRegistration>> GetAllRegistrationsforEvent(Guid eventId)
        {
            return await dbContext.EventRegistrations
                .Include(e => e.Event)
                .Where(e => e.EventId == eventId)
                .ToListAsync();
        }

        // Add to EventRegistrationRepository
        public async Task<EventRegistration> GetRegistrationByIdAsync(Guid registrationId)
        {
            return await dbContext.EventRegistrations
                .Include(e => e.Event)
                .FirstOrDefaultAsync(e => e.Id == registrationId);
        }
    
        public async Task<bool> UserHasRegisteredForEventAsync(Guid eventId, string userId)
        {
            return await dbContext.EventRegistrations
                .AnyAsync(er => er.EventId == eventId && er.UserId == userId);
        }

        public async Task<EventRegistration?> GetRegistrationDetails(Guid eventId, string userId)
        {
            return await dbContext.EventRegistrations
                .Include(e => e.Event)
                .FirstOrDefaultAsync(e => e.EventId == eventId && e.UserId == userId);
        }
    }
}