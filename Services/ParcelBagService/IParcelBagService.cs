using System.Collections.Generic;
using System.Threading.Tasks;
using post_office_management_app.Models;

namespace post_office_management.Services.ParcelBagService
{
    public interface IParcelBagService
    {
        Task<List<BagOfParcels>> GetAllParcelBagsByShipmentId(string id);
        

        Task<List<Parcel>> GetAllParcelsInBag(string id);
        

        Task<BagOfParcels> UpdateParcelsListInBag(string id);
    }
}