using Models;

namespace Repositories.Interface
{
    public interface IEventRepository
    {
        Task<PEvent> CreateAsync(PEvent pEvent);
        Task<IEnumerable<PEvent>> GetAllAsync();
        Task<PEvent?> GetById(Guid id);
        Task<PEvent?> UpdateAsync(PEvent pEvent);
        Task<PEvent?> DeleteAsync(Guid id);

        Task<PEvent?> GetByUrlHandle(string urlHandle);

    
    }
}