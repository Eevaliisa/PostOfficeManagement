using System.Collections.Generic;
using System.Threading.Tasks;
using post_office_management.Repositories;
using post_office_management_app.Models;

namespace post_office_management.Services.ShipmentService
{
    public class ShipmentService: IShipmentService
    {
        private readonly IShipmentRepository _shipmentRepository;

        public ShipmentService(IShipmentRepository shipmentRepository)
        {
            _shipmentRepository = shipmentRepository;
        }

        public async Task<List<Shipment>> GetAllShipmentsAsync()
        {
            return await _shipmentRepository.GetAllShipmentsAsync();
        }

        public async Task<Shipment> GetShipmentByIdAsync(string id)
        {
            return await _shipmentRepository.GetShipmentByIdAsync(id);
        }

        public async Task<Shipment> AddShipmentAsync(Shipment newShipment)
        {
            return await _shipmentRepository.AddAsync(newShipment);
        }
    
    }
}