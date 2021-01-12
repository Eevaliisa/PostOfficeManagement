using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using post_office_management_app.Data;
using post_office_management_app.Models;

namespace post_office_management.Repositories.LetterBagRepository
{
    public class LetterBagRepository: Repository<BagOfLetters>, ILetterBagRepository
    {
        public LetterBagRepository(DataContext context) : base(context) { }

        public async Task<List<BagOfLetters>> GetAllLetterBagsByShipmentId(string id)
        {  
        return await _context.BagOfLetters
            .Where(c => c.ShipmentId.ToUpper()
            .Equals(id.ToUpper()))
            .ToListAsync();
        }
        
        public override async Task<BagOfLetters> Add(BagOfLetters newBag){
            var result = _context.Set<BagOfLetters>()
                .AddIfNotExists<BagOfLetters>(newBag , x => x.BagId == newBag.BagId);
            await _context.SaveChangesAsync();

            return result?.Entity;
        }
    }

    
}