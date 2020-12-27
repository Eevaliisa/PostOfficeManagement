using System.Collections.Generic;
using System.Threading.Tasks;
using post_office_management.Repositories.LetterBagRepository;
using post_office_management_app.Models;

namespace post_office_management.Services.LetterBagService
{
    public class LetterBagService: ILetterBagService
    {
        private readonly ILetterBagRepository _letterBagRepository;

        public LetterBagService(ILetterBagRepository letterBagRepository)
        {
            _letterBagRepository = letterBagRepository;
        }
        public async Task<List<BagOfLetters>> GetAllLetterBagsByShipmentId(string id) 
        {
            return await _letterBagRepository.GetAllLetterBagsByShipmentId(id);
        }
        public async Task<BagOfLetters> AddBagOfLetters(BagOfLetters newBag)
        {
            return await _letterBagRepository.Add(newBag);
        }
    }
}