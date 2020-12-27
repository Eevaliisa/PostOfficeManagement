using System.Collections.Generic;
using System.Threading.Tasks;
using post_office_management.Repositories.ParcelBagRepository;
using post_office_management_app.Models;

namespace post_office_management.Services.ParcelBagService
{
    public class ParcelBagService: IParcelBagService
    {
        private readonly IParcelBagRepository _parcelBagRepository;

        public ParcelBagService(IParcelBagRepository parcelBagRepository)
        {
            _parcelBagRepository = parcelBagRepository;
        }
        public async Task<List<BagOfParcels>> GetAllParcelBagsByShipmentId(string id)
        {
            return await _parcelBagRepository.GetAllParcelBagsByShipmentId(id);
        }

        public async Task<List<Parcel>> GetAllParcelsInBag(string id)
        {
            return await _parcelBagRepository.GetAllParcelsInBag(id);
        }

        public async Task<BagOfParcels> UpdateParcelsListInBag(string id)
        {
            return await _parcelBagRepository.UpdateParcelsListInBag(id);
        }
        
    }
}