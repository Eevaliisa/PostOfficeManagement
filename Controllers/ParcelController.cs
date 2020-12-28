using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using post_office_management.Services.ParcelService;
using post_office_management.Validations;
using post_office_management_app.Models;

namespace post_office_management.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ParcelController: Controller
    {
    private readonly IParcelService _parcelService;

    public ParcelController(IParcelService parcelService)
    {
        _parcelService = parcelService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Parcel>>> GetAllParcels()
    {
        return Ok(await _parcelService.GetAllParcels());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Parcel>> GetParcelById(string id)
    {
        var parcel = await _parcelService.GetParceltById(id);

        if (parcel == null)
        {
             return NotFound();
        }
        return parcel;
    }

    [HttpPost]
    [ModelStateValidation]
    public async Task<ActionResult<Parcel>> AddParcel(Parcel newParcel)
    {
        return Ok(await _parcelService.AddParcel(newParcel));
    }

    }

}