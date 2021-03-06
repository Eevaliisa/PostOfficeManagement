using System.Collections.Generic;
using System.Threading.Tasks;
using post_office_management_app.Models;

namespace post_office_management.Services.ParcelService
{
    public interface IParcelService
    {
         Task<List<Parcel>> GetAllParcels();

         Task<Parcel> GetParcelById(string id);

         Task<List<Parcel>> GetParcelsByBagId(string id);

         Task<Parcel> AddParcel(Parcel newParcel);
    }
}