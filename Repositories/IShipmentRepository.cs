using System.Collections.Generic;
using System.Threading.Tasks;
using post_office_management_app.Models;

namespace post_office_management.Repositories
{
    public interface IShipmentRepository: IRepository<Shipment>
    {
        Task<Shipment> GetShipmentByIdAsync(string id);

        Task<List<Shipment>> GetAllShipmentsAsync();
    }
}