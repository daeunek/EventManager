namespace Models
{
    public class Category
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string UrlHandle { get; set; }
        
        public ICollection<PEvent> Events { get; set; }
    }
}