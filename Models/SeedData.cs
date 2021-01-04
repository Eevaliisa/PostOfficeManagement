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
                        ShipmentId = "1K2-123ASD",
                        DestinationAirport = Airport.HEL,
                        FlightNumber = "AB1234",
                        FlightDateTime = DateTime.Now,
                        ListOfLetterBags = new List<BagOfLetters> { },
                        ListOfParcelBags = new List<BagOfParcels> { }
                    }
                );
                context.SaveChanges();
            }
        }
    }
}