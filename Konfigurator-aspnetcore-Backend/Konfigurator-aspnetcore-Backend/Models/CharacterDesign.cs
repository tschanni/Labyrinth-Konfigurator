using System;
using System.ComponentModel.DataAnnotations;
namespace Konfigurator_aspnetcore_Backend.Models
{
	public class CharacterDesign
	{
		[Key]
		public string character { get; set; } = string.Empty;
        public byte[] img { get; set; }

        public List<GameMap> gameMaps { get; set; }
    }
}

