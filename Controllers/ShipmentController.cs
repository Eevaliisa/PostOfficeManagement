using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using post_office_management.Services.ShipmentService;
using post_office_management_app.Models;

namespace post_office_management.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ShipmentController: Controller
    {
        private readonly IShipmentService _shipmentService;
        public ShipmentController(IShipmentService shipmentService)
        {
            _shipmentService = shipmentService;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<List<Shipment>>> GetAllShipments()
        {
            return Ok(await _shipmentService.GetAllShipments());
        }

        [HttpPost]
        public async Task<ActionResult> AddShipment(Shipment newShipment)
        {
            return Ok(await _shipmentService.AddShipment(newShipment));
        }
    }
}