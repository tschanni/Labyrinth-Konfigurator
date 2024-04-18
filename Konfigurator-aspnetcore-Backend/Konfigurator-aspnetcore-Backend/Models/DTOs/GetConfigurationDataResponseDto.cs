using System;

namespace Konfigurator_aspnetcore_Backend.Models.DTOs
{
	public class GetConfigurationDataResponseDto
    {
        public GetConfigurationDataResponseDto(
            List<DesignDto> barrierDesignDtos,
            List<DesignDto> characterDesignDtos,
            List<DesignDto> targetDesignDtos,
            List<DesignDto> tileDesignDtos)
        {
            this.barrierDesignDtos = barrierDesignDtos;
            this.characterDesignDtos = characterDesignDtos;
            this.targetDesignDtos = targetDesignDtos;
            this.tileDesignDtos = tileDesignDtos;
        }

        public List<DesignDto> barrierDesignDtos { get; }
        public List<DesignDto> characterDesignDtos { get; }
        public List<DesignDto> targetDesignDtos { get; }
        public List<DesignDto> tileDesignDtos { get; }
    }
}

