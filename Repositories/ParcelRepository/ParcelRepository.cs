using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using post_office_management_app.Data;
using post_office_management_app.Models;

namespace post_office_management.Repositories.ParcelRepository
{
    public class ParcelRepository: Repository<Parcel>, IParcelRepository
    {
        public ParcelRepository(DataContext context) : base(context) { }

        public async Task<List<Parcel>> GetAllParcels()
        {
            return await GetAll().ToListAsync();
        }

        public async Task<Parcel> GetParcelById(string id)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.ParcelId == id);
        }
        
        public async Task<List<Parcel>> GetAllParcelsByBagId(string id)
        {
            return await _context.Parcels
                .Where(c => c.BagId.ToUpper().Equals(id.ToUpper()))
                .ToListAsync();
        }

        public async Task<Parcel> AddNewParcel(Parcel newParcel)
        {
            var newParcelBagId = newParcel.BagId;
            var wrongBag = _context.BagOfLetters.Where(c => c.BagId == newParcelBagId);
            
            if (wrongBag.Any())
            {
                throw new ArgumentException($"Cannot add parcel to bag of letters");

            } else { 
                try
                {
                    var result = _context.Set<Parcel>()
                        .AddIfNotExists<Parcel>(newParcel , x => x.ParcelId == newParcel.ParcelId);
                    await _context.SaveChangesAsync();

                    return result?.Entity;
                }
                catch (Exception ex)
                {
                    throw new Exception($"{nameof(newParcel)} could not be saved: {ex.Message}");
                }
            }

        }
    }
}