using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Threading;

namespace Konfigurator_aspnetcore_Backend.Models.DTOs
{
	public class AddGameMapRequestDto : AbstractGameMapDto
    {
        public AddGameMapRequestDto(
            string name,
            MapSizeDto size,
            string username,
            string tile,
            string barrier,
            string character,
            string target,
            List<VectorDto> obstacles,
            VectorDto startPos,
            VectorDto endPos) : base(
                name,
                username,
                size,
                tile,
                barrier,
                character,
                target,
                obstacles,
                startPos,
                endPos)
        {
        }
    }
}

