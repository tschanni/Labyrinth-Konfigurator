using System;
using System.ComponentModel.DataAnnotations;
namespace Konfigurator_aspnetcore_Backend.Models
{
	public class TileDesign
    {
        [Key]
        public string tile { get; set; } = string.Empty;
        public byte[] img { get; set; }

        public List<GameMap> gameMaps { get; set; }
    }
}

