using System;
namespace Konfigurator_aspnetcore_Backend.Models.DTOs
{
    public class GetGameMapResponseDto
    {
        public GetGameMapResponseDto(GetGameMapDto getGameMapDto)
        {
            this.getGameMapDto = getGameMapDto;
        }
        public GetGameMapDto getGameMapDto { get; }
    }
}

