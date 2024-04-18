using Konfigurator_aspnetcore_Backend.Data;
using Konfigurator_aspnetcore_Backend.Models.DTOs;
using Konfigurator_aspnetcore_Backend.Services.Configuration;
using Konfigurator_aspnetcore_Backend.Services.UserManagement;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Konfigurator_aspnetcore_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserManagementController : ControllerBase
    {
        private readonly IUserManagementService _userManagementService;

        public UserManagementController(IUserManagementService userManagementService)
        {
            _userManagementService = userManagementService;
        }

        [HttpPost("add")]
        public async Task<ActionResult<ServiceResponseDto<string>>> CreateUser(UserRequestDto request)
        {
            var response = await _userManagementService.CreateUser(request);
            if (response.Success)
                return Ok(response.Message);
            return BadRequest(response.Message);
        }

        [HttpPost("login")]
        public async Task<ActionResult<ServiceResponseDto<UserResponseDto>>> LoginUser(UserRequestDto request)
        {
            var response = await _userManagementService.LoginUser(request);
            if (response.Success)
                return Ok(response.Data);
            return BadRequest(response.Message);
        }
    }
}
