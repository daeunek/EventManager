namespace Models.DTO
{
    public class EventDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }

        public string DetailDescription { get; set; }
        public int AttendeesCount { get; set; }

        public string urlHandle { get; set; }
        public string FeaturedImageUrl { get; set; }

        public bool IsVisible { get; set; }

        public List<CategoryDto> Categories { get; set; } = new List<CategoryDto>();
        //Here dto is used, becoz domain models changes in the future can't affect the DTO and api

    }
}