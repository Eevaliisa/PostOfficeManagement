using System.Collections.Generic;
using System.Threading.Tasks;
using post_office_management_app.Models;

namespace post_office_management.Repositories.ParcelRepository
{
    public interface IParcelRepository: IRepository<Parcel>
    { 
        Task<List<Parcel>> GetAllParcels();
        
        Task<Parcel> GetParcelById(string id);
        
        Task<List<Parcel>> GetAllParcelsByBagId(string id);

        Task<Parcel> AddNewParcel(Parcel newParcel);
    
    }
}