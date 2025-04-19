namespace Models.DTO
{
    public class UserRegistrationResponseDto
    {
        public Guid Id { get; set; }
        public Guid EventId { get; set; }
        public string UserId { get; set; }  // auth db context we set user id to string
        public DateTime RegisteredAt { get; set; }

        public string EventDescription { get; set; }
        public string EventLocation { get; set; }
        public DateTime EventDate { get; set; }

        // Addtional information
        public string EventName { get; set; }
        public string imgUrl { get; set; }
    }
}