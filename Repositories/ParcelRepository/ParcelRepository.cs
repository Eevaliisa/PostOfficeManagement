using System.Collections.Generic;
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
    }
}