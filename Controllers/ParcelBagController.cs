using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using post_office_management.Services.ParcelBagService;
using post_office_management.Validations;
using post_office_management_app.Models;

namespace post_office_management.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ParcelBagController: Controller 
    {
        private readonly IParcelBagService _parcelBagService;

        public ParcelBagController(IParcelBagService parcelBagService)
        {
            _parcelBagService = parcelBagService;
        }

        [HttpGet]
        [Route("{id}/bagList")]
        public async Task<ActionResult<List<BagOfParcels>>> GetAllParcelBagsByShipmentId(string id)
        {
           return Ok(await _parcelBagService.GetAllParcelBagsByShipmentId(id));
        }

        [HttpPost]
        [ModelStateValidation]
        public async Task<ActionResult> AddBagOfParcels(BagOfParcels newBag)
        {
            var result = await _parcelBagService.AddBagOfParcels(newBag);
            
            return result == null ? Conflict("Bag of Parcels with given ID already exists in database") : Ok();
        }

        [HttpPut]
        [ModelStateValidation]
        public async Task<ActionResult> UpdateParcelsListInBag(string id)
        {
            return Ok(await _parcelBagService.UpdateParcelsListInBag(id));
        }

    }
}