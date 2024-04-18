using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Konfigurator_aspnetcore_Backend.Data;
using Konfigurator_aspnetcore_Backend.Models;
using Konfigurator_aspnetcore_Backend.Models.DTOs;
using Konfigurator_aspnetcore_Backend.Services.Configuration;

namespace Konfigurator_aspnetcore_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ConfigurationController : ControllerBase
    {
        private readonly IConfigurationService _configurationService;

        public ConfigurationController(IConfigurationService configurationService)
        {
            _configurationService = configurationService;
        }

        [HttpGet("getData")]
        public async Task<ActionResult<ServiceResponseDto<GetConfigurationDataResponseDto>>> GetData()
        {
            var response = await _configurationService.GetConfigurationData();
            
            if(response.Success)
                return Ok(response.Data);
            return BadRequest();
        }

        [HttpPost("addGame")]
        public async Task<ActionResult<ServiceResponseDto<AddGameMapResponseDto>>> CreateGame(AddGameMapRequestDto request)
        {
            var response = await _configurationService.CreateGame(request);
            if(response.Success)
                return Ok(response.Data);
            return BadRequest();
        }
    }
}