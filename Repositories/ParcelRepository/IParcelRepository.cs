using System.Collections.Generic;
using System.Threading.Tasks;
using post_office_management_app.Models;

namespace post_office_management.Repositories.ParcelRepository
{
    public interface IParcelRepository: IRepository<Parcel>
    {
         Task<Parcel> GetParcelById(string id);

         Task<List<Parcel>> GetAllParcels();

         Task<Parcel> AddNewParcel(Parcel newParcel);
    
    }
}