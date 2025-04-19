namespace Models
{
    public class EventRegistration
    {
        public Guid Id { get; set; }
        public Guid EventId { get; set; }
        public string UserId { get; set; }
        public DateTime RegisteredAt { get; set; }
        
        // Additional contact information for event
        public string ContactName { get; set; }
        public string ContactEmail { get; set; }
        public string ContactPhone { get; set; }
        
        // Navigation properties
        public PEvent Event { get; set; }
    }
}