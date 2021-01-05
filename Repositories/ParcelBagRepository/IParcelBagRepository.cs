using System.Collections.Generic;
using System.Threading.Tasks;
using post_office_management_app.Models;

namespace post_office_management.Repositories.ParcelBagRepository
{
    public interface IParcelBagRepository: IRepository<BagOfParcels>
    {
        Task<List<BagOfParcels>> GetAllParcelBagsByShipmentId(string id);
        
        Task<BagOfParcels> UpdateParcelsListInBag(string id);
    }
}