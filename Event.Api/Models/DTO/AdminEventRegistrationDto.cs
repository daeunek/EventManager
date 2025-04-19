namespace Models.DTO
{
    public class AdminEventRegistrationDto
    {
        public Guid Id { get; set; }
        public Guid EventId { get; set; }
        public string UserId { get; set; }
        public string ContactName { get; set; }
        public string ContactEmail { get; set; }
        public string ContactPhone { get; set; }
        public DateTime RegisteredAt { get; set; }
    }
}