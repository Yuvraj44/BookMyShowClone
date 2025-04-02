using System.ComponentModel.DataAnnotations;

namespace BookMyShowBackend.Models
{
    public class Movie
    {
        [Key]
        public int MovieId { get; set; }

        [Required]
        [MaxLength(255)]
        public string Title { get; set; }

        [Required]
        [Url]
        public string ImageUrl { get; set; }

        [Required]
        [EnumDataType(typeof(GenreType))]
        public string Genre { get; set; }

        [Required]
        [RegularExpression(@"^\d+\smin$", ErrorMessage = "Duration must be in the format 'X min'")]
        public string Duration { get; set; }

        [Required]
        public string Description { get; set; }
    }

    public enum GenreType
    {
        Anime,
        Horror,
        SciFi,
        RomCom
    }
 
}
