using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using post_office_management_app.Data;
using post_office_management_app.Models;

namespace post_office_management.Repositories.ParcelBagRepository
{
    public class ParcelBagRepository: Repository<BagOfParcels>, IParcelBagRepository
    {
        public ParcelBagRepository(DataContext context) : base(context) { }
        public async Task<List<BagOfParcels>> GetAllParcelBagsByShipmentId(string id)
        {
            return await _context.BagOfParcels
            .Where(c => c.ShipmentId.ToUpper().Equals(id.ToUpper()))
            .ToListAsync();
        }
        
        public override async Task<BagOfParcels> Add(BagOfParcels newBag)
        {
           var existsInLetterBag = _context.BagOfLetters
               .Where(c => c.BagId.ToUpper()
                   .Equals(newBag.BagId.ToUpper())).ToList();
           
           if (!existsInLetterBag.Any())
           { 
               var result = _context.Set<BagOfParcels>()
                   .AddIfNotExists<BagOfParcels>(newBag, x => x.BagId == newBag.BagId);
               await _context.SaveChangesAsync();

               return result?.Entity;
           }
           return null;
        }

        public async Task<BagOfParcels> UpdateParcelsListInBag(string id)
        {
            var bagToUpdate =  _context.BagOfParcels
            .Where(c => c.BagId == id)
            .Include(c => c.ListOfParcels)
            .FirstOrDefault();

            if (bagToUpdate != null)
            {
                bagToUpdate.ListOfParcels = _context.Parcels.Where(c => c.BagId == id).ToList();
                _context.Entry(bagToUpdate).State = EntityState.Modified;

                await _context.SaveChangesAsync();

                return bagToUpdate;
            }
            return null;
        }

    }
}