using System.Collections.Generic;
using System.Threading.Tasks;
using post_office_management.Repositories;
using post_office_management_app.Models;

namespace post_office_management.Services.ShipmentService
{
    public interface IShipmentService
    {
        Task<List<Shipment>> GetAllShipmentsAsync();
        
        Task<Shipment> GetShipmentByIdAsync(string id);
        
        Task<Shipment> AddShipmentAsync(Shipment newShipment);
        
    }
}