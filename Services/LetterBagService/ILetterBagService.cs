using System.Collections.Generic;
using System.Threading.Tasks;
using post_office_management_app.Models;

namespace post_office_management.Services.LetterBagService
{
    public interface ILetterBagService
    {
         Task<List<BagOfLetters>> GetAllLetterBagsByShipmentId(string id);

         Task<BagOfLetters> AddBagOfLetters(BagOfLetters newBag);
    }
}