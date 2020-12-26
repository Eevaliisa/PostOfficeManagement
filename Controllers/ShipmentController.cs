using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using post_office_management.Services.ShipmentService;
using post_office_management_app.Models;

namespace post_office_management.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShipmentController: Controller
    {
        private readonly IShipmentService _shipmentService;
        public ShipmentController(IShipmentService shipmentService)
        {
            _shipmentService = shipmentService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Shipment>>> GetAllShipments()
        {
            return Ok(await _shipmentService.GetAllShipments());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Shipment>> GetShipmentById(string id)
        {
            var shipment = await _shipmentService.GetShipmentById(id);

            if (shipment == null)
            {
                return NotFound();
            }
            return shipment;
        }

        [HttpPut]
        public async Task<ActionResult> FinalizeShipment(string id)
        {
            return Ok(await _shipmentService.FinalizeShipment(id));
        }

        [HttpPost]
        public async Task<ActionResult> AddShipment(Shipment newShipment)
        {
            return Ok(await _shipmentService.AddShipment(newShipment));
        }
    }
}