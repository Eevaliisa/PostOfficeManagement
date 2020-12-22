using System;
using Microsoft.EntityFrameworkCore;
using post_office_management_app.Models;

namespace post_office_management_app.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options) { }

        public DbSet<Parcel> Parcels { get; set;}
        public DbSet<Shipment> Shipments { get; set; }
        public DbSet<BagOfParcels> BagOfParcels { get; set; }
        public DbSet<BagOfLetters> BagOfLetters { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Shipment>()
                .Property(e => e.DestinationAirport)
                .HasConversion(
                    v => v.ToString(),
                    v => (Airport)Enum.Parse(typeof(Airport), v));
        }
    }
}