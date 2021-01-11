using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using post_office_management_app.Data;
using post_office_management_app.Models;

namespace post_office_management.Models
{
    public class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new DataContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<DataContext>>()))
            {
                if (context.Shipments.Any())
                {
                    return; // DB has been seeded
                }

                context.Shipments.AddRange(
                    new Shipment
                    {
                        ShipmentId = "123-AAAAAA",
                        DestinationAirport = Airport.TLL,
                        FlightNumber = "AA1234",
                        FlightDateTime = DateTime.Now,
                        ListOfLetterBags = new List<BagOfLetters> { },
                        ListOfParcelBags = new List<BagOfParcels> { }
                    },
                    new Shipment
                    {
                        ShipmentId = "123-BBBBBB",
                        DestinationAirport = Airport.HEL,
                        FlightNumber = "BB1234",
                        FlightDateTime = DateTime.Now,
                        ListOfLetterBags = new List<BagOfLetters> { },
                        ListOfParcelBags = new List<BagOfParcels> { }  
                    },
                    new Shipment
                    {
                        ShipmentId = "123-CCCCCC",
                        DestinationAirport = Airport.TLL,
                        FlightNumber = "CC1234",
                        FlightDateTime = DateTime.Now,
                        ListOfLetterBags = new List<BagOfLetters> { },
                        ListOfParcelBags = new List<BagOfParcels> { }  
                    },
                    new Shipment
                    {
                        ShipmentId = "123-DDDDDD",
                        DestinationAirport = Airport.RIX,
                        FlightNumber = "DD1234",
                        FlightDateTime = DateTime.Now,
                        ListOfLetterBags = new List<BagOfLetters> { },
                        ListOfParcelBags = new List<BagOfParcels> { }  
                    },
                    new Shipment
                    {
                        ShipmentId = "123-EEEEEE",
                        DestinationAirport = Airport.TLL,
                        FlightNumber = "EE1234",
                        FlightDateTime = DateTime.Now,
                        ListOfLetterBags = new List<BagOfLetters> { },
                        ListOfParcelBags = new List<BagOfParcels> { }  
                    }
                );
                
                context.BagOfLetters.AddRange(
                    new BagOfLetters
                    {
                        BagId = "111EEE",
                        TotalWeight = 25.005M,
                        TotalPrice = 105.00M,
                        LettersCount = 300,
                        DestinationCountryCode = "EE",
                        ShipmentId = "123-AAAAAA"
                    },
                    new BagOfLetters
                    {
                        BagId = "222EEE",
                        TotalWeight = 15.0M,
                        TotalPrice = 300.50M,
                        LettersCount = 500,
                        DestinationCountryCode = "EE",
                        ShipmentId = "123-AAAAAA"
                    }
                );
                
                context.BagOfParcels.AddRange(
                    new BagOfParcels
                    {
                        BagId = "123456",
                        ListOfParcels = new List<Parcel> { },
                        DestinationCountryCode = "EE",
                        ShipmentId = "123-AAAAAA"
                    },
                    new BagOfParcels
                    {
                        BagId = "654321",
                        ListOfParcels = new List<Parcel> { },
                        DestinationCountryCode = "EE",
                        ShipmentId = "123-AAAAAA"
                    },
                    new BagOfParcels
                    {
                        BagId = "111333",
                        ListOfParcels = new List<Parcel> { },
                        DestinationCountryCode = "EE",
                        ShipmentId = "123-AAAAAA"
                    }
                );
                
                context.Parcels.AddRange(
                    new Parcel
                    {
                        ParcelId = "EE123456HP",
                        RecipientName = "Harry Potter",
                        DestinationCountryCode = "EE",
                        WeightInKg = 10.68M,
                        Price = 55.00M,
                        BagId = "123456"
                    },
                    new Parcel
                    {
                        ParcelId = "EE223456HP",
                        RecipientName = "Ronald Weasly",
                        DestinationCountryCode = "EE",
                        WeightInKg = 3.15M,
                        Price = 25.00M,
                        BagId = "123456"
                    },
                    new Parcel
                    {
                        ParcelId = "EE323456HP",
                        RecipientName = "Hermione Granger",
                        DestinationCountryCode = "EE",
                        WeightInKg = 10.68M,
                        Price = 55.00M,
                        BagId = "123456"
                    },
                    new Parcel
                    {
                        ParcelId = "EE423456HP",
                        RecipientName = "Sirius Black",
                        DestinationCountryCode = "EE",
                        WeightInKg = 2.99M,
                        Price = 389.00M,
                        BagId = "123456"
                    },
                    new Parcel
                    {
                        ParcelId = "EE523456HP",
                        RecipientName = "Severus Snape",
                        DestinationCountryCode = "EE",
                        WeightInKg = 0.99M,
                        Price = 17.00M,
                        BagId = "123456"
                    },
                    new Parcel
                    {
                        ParcelId = "EE623456HP",
                        RecipientName = "Luna Lovegood",
                        DestinationCountryCode = "EE",
                        WeightInKg = 4.69M,
                        Price = 38.70M,
                        BagId = "123456"
                    }
                );
                context.SaveChanges();
            }
        }
    }
}