using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace Models.DTO
{
    public class RegisterRequestDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}