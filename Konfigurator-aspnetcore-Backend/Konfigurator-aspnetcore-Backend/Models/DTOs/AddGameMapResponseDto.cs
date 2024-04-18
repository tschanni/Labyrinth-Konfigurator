using System;
namespace Konfigurator_aspnetcore_Backend.Models.DTOs
{
	public class AddGameMapResponseDto
	{
        public AddGameMapResponseDto(int gameMapId)
        {
            this.gameMapId = gameMapId;
        }
        public int gameMapId { get; }
	}
}

