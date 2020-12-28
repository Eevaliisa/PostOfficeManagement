using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace post_office_management_app.Models
{
    public class Parcel
    {
        [Required]
        [RegularExpression(@"^[a-zA-Z]{2}[0-9]{6}[a-zA-Z]{2}$")]
        [Index(IsUnique = true)]
        public string ParcelId { get; set; }

        [Required]
        [StringLength(100)]
        public string RecipientName {get; set; }

        [Required]
        [RegularExpression(@"^[a-zA-Z]{2}$")]
        public string DestinationCountryCode { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,3)")]
        public decimal WeightInKg { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        public string BagId { get; set; }
        public BagOfParcels BagOfParcels { get; set; } 

    }
}