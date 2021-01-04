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

         public async Task<Shipment> GetShipmentById(string id)
        {
            return await GetAll().FirstOrDefaultAsync(x => x.ShipmentId == id);
        }

        public async Task<List<Shipment>> GetAllShipments()
        {
            return await GetAll().ToListAsync();
        }
        
        public override async Task<Shipment> Add(Shipment shipment){
            var result = _context.Set<Shipment>()
                .AddIfNotExists<Shipment>(shipment , x => x.ShipmentId == shipment.ShipmentId);
            await _context.SaveChangesAsync();

            return result?.Entity;
        }
        
    }
}