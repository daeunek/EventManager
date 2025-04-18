using Models;
using Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using Data;

namespace Repositories.Implementation{
    public class PEventRepository : IEventRepository
    {
        private readonly ApplicationDbContext dbContext;
        public PEventRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<PEvent> CreateAsync(PEvent pEvent)
        {
            await dbContext.Events.AddAsync(pEvent);
            await dbContext.SaveChangesAsync();
            return pEvent;
        }

        public async Task<IEnumerable<PEvent>> GetAllAsync()
        {
            var events = await dbContext.Events
                .Include(e => e.Categories)
                .ToListAsync();
            return events;
        }

        public async Task<PEvent?> GetById(Guid id)
        {
            return await dbContext.Events
                .Include(e => e.Categories)
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<PEvent?> GetByUrlHandle(string urlHandle)
        {
            return await dbContext.Events
                .Include(e => e.Categories)
                .FirstOrDefaultAsync(e => e.urlHandle == urlHandle);    
        }

        public async Task<PEvent?> UpdateAsync(PEvent pEvent)
        {
            var existingEvent = await dbContext.Events
                .Include(e => e.Categories)
                .FirstOrDefaultAsync(e => e.Id == pEvent.Id);

            if (existingEvent != null)
            {
                dbContext.Entry(existingEvent).CurrentValues.SetValues(pEvent);
                existingEvent.Categories = pEvent.Categories;  // setvalues only update scalar so this is needed
                await dbContext.SaveChangesAsync();
                return existingEvent;
            }

            return null;
        }

        public async Task<PEvent?> DeleteAsync(Guid id)
        {
            var existingEvent = await dbContext.Events.FirstOrDefaultAsync(e => e.Id == id);
            if (existingEvent != null)
            {
                dbContext.Events.Remove(existingEvent);
                await dbContext.SaveChangesAsync();
                return existingEvent;
            }
            return null;
        }
    }
}