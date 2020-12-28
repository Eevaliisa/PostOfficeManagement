using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using post_office_management.Services.ParcelBagService;
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
        [Route("{shipmentId}/bagslist")]
        public async Task<ActionResult<List<BagOfParcels>>> GetAllParcelBagsByShipmentId(string id)
        {
           return Ok(await _parcelBagService.GetAllParcelBagsByShipmentId(id));
        }

        [HttpGet]
        [Route("{bagId}/parcels")]
        public async Task<ActionResult<List<Parcel>>> GetAllParcelsInBag(string id)
        {
            return Ok(await _parcelBagService.GetAllParcelsInBag(id));
        }

        [HttpPost]
        public async Task<ActionResult> AddBagOfParcels(BagOfParcels newBag)
        {
            return Ok(await _parcelBagService.AddBagOfParcels(newBag));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateParcelsListInBag(string id)
        {
            return Ok(await _parcelBagService.UpdateParcelsListInBag(id));
        }

    }
}