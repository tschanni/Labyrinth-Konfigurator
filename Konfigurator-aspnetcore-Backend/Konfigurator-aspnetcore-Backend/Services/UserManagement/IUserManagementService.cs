using Konfigurator_aspnetcore_Backend.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Konfigurator_aspnetcore_Backend.Services.UserManagement
{
    public interface IUserManagementService
    {
        Task<ServiceResponseDto<string>> CreateUser(UserRequestDto request);
        Task<ServiceResponseDto<UserResponseDto>> LoginUser(UserRequestDto request);
        //Task<ServiceResponse<string>> logoutUser();
    }
}
