using System.Net;
using MyApp.Api.Models.Domain;


namespace Repositories.Interface
{
    public interface IImageRepository
    {
        Task<EventImage> Upload(IFormFile file, EventImage eventImage);
        Task<IEnumerable<EventImage>> GetAll();
    }
}