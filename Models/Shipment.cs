using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace post_office_management_app.Models
{
    public class Shipment
    {
        [Required]
        [RegularExpression(@"^[0-9a-zA-Z]{3}\-[0-9a-zA-Z]{6}$")]
        [Index(IsUnique = true)]
        public string ShipmentId { get; set; }
        
        [Required]
        [JsonConverter(typeof(StringEnumConverter))]
        public Airport DestinationAirport { get; set; }

        [Required]
        [RegularExpression(@"^[a-zA-Z]{2}[0-9]{4}$")]
        public string FlightNumber { get; set; }

        [Required]
        public DateTime FlightDateTime { get; set; }

        public List<BagOfParcels> ListOfParcelBags { get; set; } = new List<BagOfParcels>();
    
        public List<BagOfLetters> ListOfLetterBags { get; set; } = new List<BagOfLetters>();

        public bool isFinalized { get; set; } = false;

    }
}