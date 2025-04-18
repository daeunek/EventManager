using Data;
using Microsoft.EntityFrameworkCore;
using MyApp.Api.Models.Domain;
using Repositories.Interface;

namespace Repositories.Implementation
{
    public class ImageRepository : IImageRepository
    {
         private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly ApplicationDbContext dbContext;

        public ImageRepository(IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor,
        ApplicationDbContext applicationDbContext)
        {
            this.webHostEnvironment = webHostEnvironment;
            this.httpContextAccessor = httpContextAccessor;
            this.dbContext = applicationDbContext;
        }

        public async Task<IEnumerable<EventImage>> GetAll()
        {
            return await dbContext.EventImages.ToListAsync();
        }

        public async Task<EventImage> Upload(IFormFile file, EventImage eventImage)
        {
            // 1- Upload the image to API/Images
            var localPath = Path.Combine(webHostEnvironment.ContentRootPath,"Images",$"{eventImage.FileName}{eventImage.FileExtension}");
            using var stream = new FileStream(localPath, FileMode.Create);
            await file.CopyToAsync(stream);

            // 2- Save the image to the database
            // https://codepulse.com/images/somefilename.jpg
            var httpRequest = httpContextAccessor.HttpContext.Request;
            var urlPath = $"{httpRequest.Scheme}://{httpRequest.Host}{httpRequest.PathBase}/images/{eventImage.FileName}{eventImage.FileExtension}";
            eventImage.Url = urlPath;
            await dbContext.EventImages.AddAsync(eventImage);
            await dbContext.SaveChangesAsync();

            return eventImage;


        }


    }
}