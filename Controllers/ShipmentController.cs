using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using post_office_management.Logger;
using post_office_management.Services.ShipmentService;
using post_office_management.Validations;
using post_office_management_app.Models;

namespace post_office_management.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShipmentController: Controller
    {
        private readonly IShipmentService _shipmentService;
        private readonly ILoggerManager _logger;
        public ShipmentController(IShipmentService shipmentService, ILoggerManager logger)
        {
            _shipmentService = shipmentService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<List<Shipment>>> GetAllShipments()
        {
            _logger.LogInfo("Fetching all shipments");

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

        [HttpPut("{id}")]
        [ModelStateValidation]
        public async Task<ActionResult> FinalizeShipment(string id)
        {
            return Ok(await _shipmentService.FinalizeShipment(id));
        }

        [HttpPost]
        [ModelStateValidation]
        public async Task<ActionResult> AddShipment(Shipment newShipment)
        {
            var result = await _shipmentService.AddShipment(newShipment);
            
            return result == null ? Conflict("Shipment with given ID already exists in database") : Ok("New shipment added");
        }
    }
}