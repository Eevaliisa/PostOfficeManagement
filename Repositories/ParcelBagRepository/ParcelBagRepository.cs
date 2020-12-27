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

        public async Task<List<Parcel>> GetAllParcelsInBag(string id)
        {
            var parcelBag = await GetAll().FirstOrDefaultAsync(x => x.BagId == id);
            
            return parcelBag.ListOfParcels;
        }

        public async Task<BagOfParcels> UpdateParcelsListInBag(string id)
        {
            var bagToUpdate =  _context.BagOfParcels
            .Where(c => c.BagId == id)
            .Include(c => c.ListOfParcels)
            .FirstOrDefault();

            bagToUpdate.ListOfParcels =  _context.Parcels.Where(c => c.BagId == id).ToList();
            _context.Entry(bagToUpdate).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return bagToUpdate;
            
        }

    }
}