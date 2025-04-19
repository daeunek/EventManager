namespace Models.DTO
{
    public class RegisterEventResponseDto
    {
        public Guid Id { get; set; }
        public Guid EventId { get; set; }
        public string UserId { get; set; }  // auth db context we set user id to string
        public string ContactName { get; set; }
        public string ContactPhone { get; set; }
        public string ContactEmail { get; set; }
        public DateTime RegisteredAt { get; set; }

        // Addtional information
        public string EventName { get; set; }
        public string imgUrl { get; set; }
    }
}

    