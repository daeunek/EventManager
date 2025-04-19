namespace Models.DTO
{
    public class RegisterEventRequestDto
    {
        public Guid EventId { get; set; }
        public string ContactName { get; set; }
        public string ContactPhone { get; set; }
    }
}