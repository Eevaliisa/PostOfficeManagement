using System.Collections.Generic;
using System.Threading.Tasks;
using post_office_management_app.Models;

namespace post_office_management.Repositories.LetterBagRepository
{
    public interface ILetterBagRepository: IRepository<BagOfLetters>
    {
         Task<List<BagOfLetters>> GetAllLetterBagsByShipmentId(string id);
    }
}