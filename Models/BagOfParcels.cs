using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace post_office_management_app.Models
{
    public class BagOfParcels
    {
        [Key]
        [Required]
        [Index(IsUnique = true)]
        [MaxLength(15)]
        public string BagId { get; set; }

        [Required]
        public List<Parcel> ListOfParcels { get; set; } = new List<Parcel>();

        [Required]
        [RegularExpression(@"^[a-zA-Z]{2}$")]
        public string DestinationCountryCode { get; set; }

        public string ShipmentId { get; set; }
        public Shipment Shipment { get; set; }
        
    }
}