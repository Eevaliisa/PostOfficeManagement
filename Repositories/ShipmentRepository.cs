using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using post_office_management_app.Data;
using post_office_management_app.Models;

namespace post_office_management.Repositories
{
    public class ShipmentRepository: Repository<Shipment>, IShipmentRepository
    {
        public ShipmentRepository(DataContext context) : base(context) { }

         public async Task<Shipment> GetShipmentByIdAsync(string id)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.ShipmentId == id);
        }

        public async Task<List<Shipment>> GetAllShipmentsAsync()
        {
            return await GetAll().ToListAsync();
        }
        
    }
}