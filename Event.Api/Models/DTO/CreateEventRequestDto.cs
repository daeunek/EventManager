namespace Models.DTO
{
    public class CreateEventRequestDto
    {
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }

        public string DetailDescription { get; set; }
        public int AttendeesCount { get; set; }

        public string urlHandle { get; set; }
        public string FeaturedImageUrl { get; set; }

        public bool IsVisible { get; set; }
        public Guid[] Categories { get; set; } //for many to many rs
    }
}