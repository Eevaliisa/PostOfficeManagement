using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using post_office_management.Services.LetterBagService;
using post_office_management_app.Models;

namespace post_office_management.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LetterBagController: Controller
    {
        private readonly ILetterBagService _letterBagService;

        public LetterBagController(ILetterBagService letterBagService)
        {
            _letterBagService = letterBagService;
        }

        [HttpGet]
        [Route("{shipmentId}/bagslist")]
        public async Task<ActionResult<List<BagOfLetters>>> GetAllLetterBagsByShipmentId(string id)
        {
           return Ok(await _letterBagService.GetAllLetterBagsByShipmentId(id));
        }

        [HttpPost]
        public async Task<ActionResult> AddBagOfLetters(BagOfLetters newBag)
        {
            return Ok(await _letterBagService.AddBagOfLetters(newBag));
        }


    }
}