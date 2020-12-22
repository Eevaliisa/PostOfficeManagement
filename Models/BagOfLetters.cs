using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace post_office_management_app.Models
{
    public class BagOfLetters
    {
        [Key]
        [Required]
        [Index(IsUnique = true)]
        public string BagId { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,3)")]
        public decimal TotalWeight { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPrice { get; set; }

        [Required]
        public int LettersCount { get; set; }

        [RegularExpression(@"^[A-Z]{2}$")]
        public string DestinationCountryCode { get; set; }
        
        public Shipment Shipment { get; set; }
    }
}