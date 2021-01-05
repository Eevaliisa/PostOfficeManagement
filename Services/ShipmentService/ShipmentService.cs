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

        public async Task<List<Shipment>> GetAllShipments()
        {
            return await _shipmentRepository.GetAllShipments();
        }

        public async Task<Shipment> GetShipmentById(string id)
        {
            return await _shipmentRepository.GetShipmentById(id);
        }

        public async Task<Shipment> AddShipment(Shipment newShipment)
        {
            return await _shipmentRepository.Add(newShipment);
        }

        public async Task<Shipment> FinalizeShipment(string id)
        {
            var shipment = await _shipmentRepository.GetShipmentById(id);
            shipment.isFinalized = true;

            return await _shipmentRepository.Update(shipment);
        }

    }
}