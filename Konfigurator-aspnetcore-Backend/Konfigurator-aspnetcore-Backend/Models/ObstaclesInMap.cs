using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
namespace Konfigurator_aspnetcore_Backend.Models
{
	[PrimaryKey(nameof(gameMapId), nameof(x), nameof(y))]
	public class ObstaclesInMap
	{
		[ForeignKey("GameMap")]
		public int gameMapId { get; set; }
		public int x { get; set; }
		public int y { get; set; }

		public GameMap gameMap { get; set; }
	}
}

