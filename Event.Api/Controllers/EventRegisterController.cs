using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Repositories.Interface;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Models.DTO;
using Models;
using System.Linq.Expressions;

namespace Controllers{
    [Route("api/[controller]")]
    [ApiController]
    public class EventRegisterController : ControllerBase
    {
        private readonly IEventRepository eventRepository;
        private readonly IEventRegistrationRepository eventRegistrationRepository;
        private readonly UserManager<IdentityUser> userManager;

        public EventRegisterController(IEventRepository eventRepository, IEventRegistrationRepository eventRegistrationRepository, UserManager<IdentityUser> userManager)
        {
            this.eventRepository = eventRepository;
            this.eventRegistrationRepository = eventRegistrationRepository;
            this.userManager = userManager;
        }

        // POST: https://localhost:7294/api/eventregister
        [HttpPost]
        [Authorize(Roles = "User")]
     
       public async Task<IActionResult> RegisterForEvent(RegisterEventRequestDto request)
        {
            try
            {
        
                // Get the current user
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
               
                var user = await userManager.FindByIdAsync(userId);
                // var user = await userManager.GetUserAsync(User);
                if (user == null)
                {
                    return Unauthorized();
                }

                

                // Check if the event exists
                var pEvent = await eventRepository.GetById(request.EventId);

                if (pEvent == null)
                {
                    return NotFound("Event not found.");
                }

                // check if user is admin and preven reistration
                if (userManager.IsInRoleAsync(user, "Admin").Result)
                {
                    return BadRequest("Admins cannot register for events.");
                }

                // Check if the user has already registered for this event
                var hasRegistered = await eventRegistrationRepository.UserHasRegisteredForEventAsync(request.EventId, user.Id);
                if (hasRegistered)
                {
                    ModelState.AddModelError("", "You have already registered for this event.");
                    return ValidationProblem(ModelState);
                }

                //check event capacity
                var registrationCount = await eventRegistrationRepository.GetEventRegistrationCountAsync(request.EventId);
                if (registrationCount >= pEvent.AttendeesCount) {
                    ModelState.AddModelError("", "Event is full.");
                    return ValidationProblem(ModelState);
                }

                //Map Dto to domain model
                var registration = new EventRegistration
                {
                
                    EventId = request.EventId,
                    UserId = user.Id,
                    RegisteredAt = DateTime.UtcNow,
                    ContactName = request.ContactName ,
                    ContactEmail =  user.Email,
                    ContactPhone = request.ContactPhone
                };

                registration = await eventRegistrationRepository.RegisterForEventAsync(registration);

                //Map domain model to Dto
                var response = new RegisterEventResponseDto {
                    Id = registration.Id,
                    EventId = registration.EventId,
                    UserId = registration.UserId,
                    ContactName = registration.ContactName,
                    ContactPhone = registration.ContactPhone,
                    ContactEmail = registration.ContactEmail,
                    RegisteredAt = registration.RegisteredAt,
                    EventName = pEvent.Name,
                    imgUrl = pEvent.FeaturedImageUrl
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in register for event: {ex.Message}");
                return StatusCode(500, $"Internal server error : {ex.Message}");
            }
        }

        // GET: https://localhost:7294/api/eventregister/myregistrations
        [HttpGet]
        [Authorize (Roles = "User")]

        public async Task<IActionResult> GetMyEventRegistrations()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return Unauthorized();
            }

            var registrations = await eventRegistrationRepository.GetUserRegistrationsAsync(user.Id);

            var response = new List<UserRegistrationResponseDto>();
            foreach (var registration in registrations)
            {
                var pEvent = await eventRepository.GetById(registration.EventId);
                if (pEvent != null)
                {
                    response.Add(new UserRegistrationResponseDto
                    {
                        Id = registration.Id,
                        EventId = registration.EventId,
                        UserId = registration.UserId,
                        RegisteredAt = registration.RegisteredAt,
                        EventDescription = pEvent.Description,
                        EventLocation = pEvent.Location,
                        EventDate = pEvent.Date,
                        EventName = pEvent.Name,
                        imgUrl = pEvent.FeaturedImageUrl
                    });
                }

            }
            return Ok(response);
        }

        // GET: https://localhost:7294/api/eventregister/{id}
        [HttpGet]
        [Route("{eventId:Guid}")]
        [Authorize(Roles = "Admin")]

        public async Task<IActionResult> GetRegistrationsByAdmin(Guid eventId)
        {
            var pEvent = await eventRepository.GetById(eventId);
            if (pEvent == null)
            {
                return NotFound("Event not found.");
            }
            var registrations = await eventRegistrationRepository.GetAllRegistrationsforEvent(eventId);

            var response = new List<AdminEventRegistrationDto>();

            foreach (var registration in registrations)
            {
                response.Add(new AdminEventRegistrationDto
                {
                    Id = registration.Id,
                    EventId = registration.EventId,
                    UserId = registration.UserId,
                    ContactName = registration.ContactName,
                    ContactEmail = registration.ContactEmail,
                    ContactPhone = registration.ContactPhone,
                    RegisteredAt = registration.RegisteredAt
                });
                
            }

            return Ok(response);
        }



        // DELETE: https://localhost:7294/api/eventregister/{registrationId:Guid}
        [HttpDelete]
        [Route("{registrationId:Guid}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> CancelRegistration(Guid registrationId)
        {
            try
            {
                // Get the current user
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = await userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return Unauthorized();
                }

                // First get the registration details
                var registration = await eventRegistrationRepository.GetRegistrationByIdAsync(registrationId);
                    
                if (registration == null)
                {
                    return NotFound("Registration not found.");
                }

                // Verify the registration belongs to the current user
                if (registration.UserId != userId)
                {
                    return Forbid("You are not authorized to cancel this registration.");
                }

                // Check if the event has already started
                var pEvent = await eventRepository.GetById(registration.EventId);
                if (pEvent.Date <= DateTime.Now)
                {
                    return BadRequest("Cannot cancel registration for an event that has already started.");
                }

                // Cancel the registration
                var cancelledRegistration = await eventRegistrationRepository.CancelRegistrationAsync(registration.EventId, userId);
                
                if (cancelledRegistration == null)
                {
                    return NotFound("Registration not found or already cancelled.");
                }

                // Return response
                var response = new RegisterEventResponseDto
                {
                    Id = cancelledRegistration.Id,
                    EventId = cancelledRegistration.EventId,
                    UserId = cancelledRegistration.UserId,
                    ContactName = cancelledRegistration.ContactName,
                    ContactPhone = cancelledRegistration.ContactPhone,
                    ContactEmail = cancelledRegistration.ContactEmail,
                    RegisteredAt = cancelledRegistration.RegisteredAt,
                    EventName = pEvent.Name,
                    imgUrl = pEvent.FeaturedImageUrl
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception in cancel registration: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}