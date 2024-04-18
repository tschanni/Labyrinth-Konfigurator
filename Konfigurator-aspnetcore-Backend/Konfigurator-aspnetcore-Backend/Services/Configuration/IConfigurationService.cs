using System;
using Microsoft.AspNetCore.Mvc;
using Konfigurator_aspnetcore_Backend.Models.DTOs;

namespace Konfigurator_aspnetcore_Backend.Services.Configuration
{
	public interface IConfigurationService
	{
		Task<ServiceResponseDto<GetConfigurationDataResponseDto>> GetConfigurationData();
		Task<ServiceResponseDto<AddGameMapResponseDto>> CreateGame(AddGameMapRequestDto request);
	}
}

