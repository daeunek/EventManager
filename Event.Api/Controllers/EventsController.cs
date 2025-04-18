using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Repositories.Interface;
using Models.DTO;
using Models;
using Repositories.Implementation;
using Microsoft.AspNetCore.Authorization;

namespace Controllers{
    [Route("api/[controller]")]
    [ApiController]
   
    public class EventsController : ControllerBase
    {
        private readonly IEventRepository eventRepository;
        private readonly ICategoryRepository categoryRepository;
        public EventsController(IEventRepository eventRepository, ICategoryRepository categoryRepository)
        {
            this.eventRepository = eventRepository;
            this.categoryRepository = categoryRepository;
        }
    

        // POST: https//localhost:7294/api/events
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult>CreateEvent(CreateEventRequestDto request)
        {   
            //Map DTO to domain model
            var pEvent = new PEvent
            {
                Name = request.Name,
                Date=request.Date,
                Location=request.Location,
                Description=request.Description,
                DetailDescription=request.DetailDescription,
                AttendeesCount=request.AttendeesCount,
                urlHandle=request.urlHandle,
                FeaturedImageUrl=request.FeaturedImageUrl,
                IsVisible=request.IsVisible,
                Categories = new List<Category>()
            };

            //Map categories
            foreach (var categoryId in request.Categories)
            {
                var existingCategory = await categoryRepository.GetByIdAsync(categoryId);
                if (existingCategory != null)
                {
                    pEvent.Categories.Add(existingCategory);
                }
            }

            pEvent = await eventRepository.CreateAsync(pEvent);

            var response = new EventDto
            {
                Id = pEvent.Id,
                Name = pEvent.Name,
                Date = pEvent.Date,
                Location = pEvent.Location,
                Description = pEvent.Description,
                DetailDescription = pEvent.DetailDescription,
                AttendeesCount = pEvent.AttendeesCount,
                urlHandle = pEvent.urlHandle,
                FeaturedImageUrl = pEvent.FeaturedImageUrl,
                IsVisible = pEvent.IsVisible,
                //select will transform the category obj in categories to CategoryDto
                Categories = pEvent.Categories.Select(x => new CategoryDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    UrlHandle = x.UrlHandle
                }).ToList()
            };
            return Ok(response);
        }


        // GET: https//localhost:7294/api/events
        [HttpGet]
        public async Task<IActionResult> GetAllEvents()
        {
           var events = await eventRepository.GetAllAsync();
        
           //Map domain model to DTO
           var response = new List<EventDto>();
           foreach (var pEvent in events)
           {
                response.Add(new EventDto{
                    Id = pEvent.Id,
                    Name = pEvent.Name,
                    Date = pEvent.Date,
                    Location = pEvent.Location,
                    Description = pEvent.Description,
                    DetailDescription = pEvent.DetailDescription,
                    AttendeesCount = pEvent.AttendeesCount,
                    urlHandle = pEvent.urlHandle,
                    FeaturedImageUrl = pEvent.FeaturedImageUrl,
                    IsVisible = pEvent.IsVisible,
                    Categories = pEvent.Categories.Select(x => new CategoryDto
                    {
                        Id = x.Id,
                        Name = x.Name,
                        UrlHandle = x.UrlHandle
                    }).ToList()
                });
           }
              return Ok(response);
        }

        // GET: https//localhost:7294/api/events/{id}
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetEventById(Guid id)
        {
            var pEvent = await eventRepository.GetById(id);
            if (pEvent == null)
            {
                return NotFound();
            }

            var response = new EventDto
            {
                Id = pEvent.Id,
                Name = pEvent.Name,
                Date = pEvent.Date,
                Location = pEvent.Location,
                Description = pEvent.Description,
                DetailDescription = pEvent.DetailDescription,
                AttendeesCount = pEvent.AttendeesCount,
                urlHandle = pEvent.urlHandle,
                FeaturedImageUrl = pEvent.FeaturedImageUrl,
                IsVisible = pEvent.IsVisible,
                Categories = pEvent.Categories.Select(x => new CategoryDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    UrlHandle = x.UrlHandle
                }).ToList()
            };

            return Ok(response);
        }

        // GET: https//localhost:7294/api/events/{urlHandle}
        [HttpGet]
        [Route("{urlHandle}")]
        public async Task<IActionResult> GetEventByUrlHandle(string urlHandle)
        {
            var pEvent = await eventRepository.GetByUrlHandle(urlHandle);
            if (pEvent == null)
            {
                return NotFound();
            }

            var response = new EventDto
            {
                Id = pEvent.Id,
                Name = pEvent.Name,
                Date = pEvent.Date,
                Location = pEvent.Location,
                Description = pEvent.Description,
                DetailDescription = pEvent.DetailDescription,
                AttendeesCount = pEvent.AttendeesCount,
                urlHandle = pEvent.urlHandle,
                FeaturedImageUrl = pEvent.FeaturedImageUrl,
                IsVisible = pEvent.IsVisible,
                Categories = pEvent.Categories.Select(x => new CategoryDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    UrlHandle = x.UrlHandle
                }).ToList()
            };

            return Ok(response);
        }

        // PUT: https//localhost:7294/api/events/{id}
        [HttpPut]
        [Route("{id:Guid}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateEvent(Guid id, UpdateEventRequestDto request)
        {
            // Dto to Domain model
            var pEvent = new PEvent
            {
                Id = id,
                Name = request.Name,
                Date = request.Date,
                Location = request.Location,
                Description = request.Description,
                DetailDescription = request.DetailDescription,
                AttendeesCount = request.AttendeesCount,
                urlHandle = request.urlHandle,
                FeaturedImageUrl = request.FeaturedImageUrl,
                IsVisible = request.IsVisible,
                Categories = new List<Category>()
            };

            //adding Categories to the event
            foreach (var categoryId in request.Categories)
            {
                var existingCategory = await categoryRepository.GetByIdAsync(categoryId);
                if (existingCategory != null)
                {
                    pEvent.Categories.Add(existingCategory);
                }
            }

            // Call repository to update the event
            var updtedEvent = await eventRepository.UpdateAsync(pEvent);

            // checki if the event is found
            if (updtedEvent == null)
            {
                return NotFound();
            }

            // Map domain event model to DTO
            var response = new EventDto{
                Id = updtedEvent.Id,
                Name = updtedEvent.Name,
                Date = updtedEvent.Date,
                Location = updtedEvent.Location,
                Description = updtedEvent.Description,
                DetailDescription = updtedEvent.DetailDescription,
                AttendeesCount = updtedEvent.AttendeesCount,
                urlHandle = updtedEvent.urlHandle,
                FeaturedImageUrl = updtedEvent.FeaturedImageUrl,
                IsVisible = updtedEvent.IsVisible,
                Categories = updtedEvent.Categories.Select(x => new CategoryDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    UrlHandle = x.UrlHandle
                }).ToList()
            };
            return Ok(response);
        }

        // DELETE: https//localhost:7294/api/events/{id}
        [HttpDelete]
        [Route("{id:Guid}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteEvent(Guid id)
        {
            var deletedEvent = await eventRepository.DeleteAsync(id);
            if (deletedEvent == null)
            {
                return NotFound();
            }
            var response = new EventDto
            {
                Id = deletedEvent.Id,
                Name = deletedEvent.Name,
                Date = deletedEvent.Date,
                Location = deletedEvent.Location,
                Description = deletedEvent.Description,
                DetailDescription = deletedEvent.DetailDescription,
                AttendeesCount = deletedEvent.AttendeesCount,
                urlHandle = deletedEvent.urlHandle,
                FeaturedImageUrl = deletedEvent.FeaturedImageUrl,
                IsVisible = deletedEvent.IsVisible,
            };
            return Ok(response);
            

        }
        
       
    }


}