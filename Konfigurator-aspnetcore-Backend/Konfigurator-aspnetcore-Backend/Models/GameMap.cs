using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Konfigurator_aspnetcore_Backend.Models
{
	public class GameMap
	{
		[Key]
		public int gameMapId { get; set; }
		public string name { get; set; }
        [ForeignKey("User")]
        public string username { get; set; }
        public int sizeX { get; set; }
        public int sizeY { get; set; }
		[ForeignKey("TileDesign")]
        public string tile { get; set; }
        [ForeignKey("BarrierDesign")]
        public string barrier { get; set; }
        [ForeignKey("CharacterDesign")]
        public string character { get; set; }
        [ForeignKey("TargetDesign")]
        public string target{ get; set; }
		public int startPosX { get; set; }
        public int startPosY { get; set; }
        public int endPosX { get; set; }
        public int endPosY { get; set; }

        // 1:n-Beziehungen
        public User user { get; set; }
        public List<ObstaclesInMap> obstaclesInMaps { get; set; }

        public BarrierDesign barrierDesign { get; set; }
        public CharacterDesign characterDesign { get; set; }
        public TargetDesign targetDesign { get; set; }
        public TileDesign tileDesign { get; set; }

        public List<Highscore> highscores { get; set; }
    }
}
