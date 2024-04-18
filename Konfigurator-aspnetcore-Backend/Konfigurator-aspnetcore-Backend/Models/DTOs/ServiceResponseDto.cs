using System;
namespace Konfigurator_aspnetcore_Backend.Models.DTOs
{
	public class ServiceResponseDto<T>
	{
		public T? Data { get; set; }
		public bool Success { get; set; } = true;
		public string Message { get; set; } = string.Empty;
	}

	public class ServiceResponse
	{
		public bool Success { get; set; } = true;
		public string Message { get; set; } = string.Empty;
	}
}

