using System.Collections.Generic;
using System.Threading.Tasks;
using post_office_management.Repositories.ParcelRepository;
using post_office_management_app.Models;

namespace post_office_management.Services.ParcelService
{
    public class ParcelService: IParcelService
    {
        private readonly IParcelRepository _parcelRepository;

        public ParcelService(IParcelRepository parcelRepository)
        {
            _parcelRepository = parcelRepository;
        }

        public async Task<List<Parcel>> GetAllParcels()
        {
            return await _parcelRepository.GetAllParcels();
        }

        public async Task<Parcel> GetParceltById(string id)
        {
            return await _parcelRepository.GetParcelById(id);
        }

        public async Task<Parcel> AddParcel(Parcel newParcel)
        {
            return await _parcelRepository.Add(newParcel);
        }

    }
}