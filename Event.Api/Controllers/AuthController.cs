using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Models.DTO;
using Repositories.Interface;

namespace Controllers
{
    //https://localhost:xxxx/api/auth   //AuthController is changed to Auth by [conroller]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly ITokenRepository tokenRepository;
        public AuthController(UserManager<IdentityUser> userManager,
            ITokenRepository tokenRepository)
        {
            this.userManager = userManager;
            this.tokenRepository = tokenRepository;
        }
      
        //POST: {apibaseutl}/api/auth/register
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto request)
        {
            // Create the identity user object
            var user = new IdentityUser{
                UserName = request.Email?.Trim(),
                Email = request.Email?.Trim(),
            };

            // Create user
            var identityResult = await userManager.CreateAsync(user, request.Password);
            if (identityResult.Succeeded)
            {
                // Add role to user (Noraml User)
                identityResult = await userManager.AddToRoleAsync(user, "User");
                if (identityResult.Succeeded)
                {
                    return Ok();
                }
                else {
                    if (identityResult.Errors.Any())
                    {
                        foreach(var error in identityResult.Errors)
                        {
                            ModelState.AddModelError("", error.Description);
                        }
                    }
                }
            }
            else {
                if (identityResult.Errors.Any())
                {
                    foreach(var error in identityResult.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }
            }
            return ValidationProblem(ModelState);
        }

        //POST: {apibaseutl}/api/auth/login
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
        {
            // Check if user exists
            var user = await userManager.FindByEmailAsync(request.Email);
            if (user != null)
            {
                 // Check password
                var result = await userManager.CheckPasswordAsync(user, request.Password);

                // if password is correct
                if (result)
                {   
                    var roles = await userManager.GetRolesAsync(user);
                    // create a token and response
                    var jwtToken = tokenRepository.CreateJwtToken(user, roles.ToList());

                    var response = new LoginResponseDto()
                    {
                        Email = request.Email,
                        Roles = roles.ToList(),
                        Token = jwtToken 
                    };

                    return Ok(response);
                }               
            }
            ModelState.AddModelError("", "Invalid email or password");
            return ValidationProblem(ModelState);           
        }
    }
}