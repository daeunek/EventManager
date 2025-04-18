namespace Models.DTO{
    public class UpdateEventRequestDto
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

        public List<Guid> Categories { get; set; } = new List<Guid>();
    }
}