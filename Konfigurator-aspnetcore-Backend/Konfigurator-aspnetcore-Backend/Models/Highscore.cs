using System.ComponentModel.DataAnnotations;

namespace Konfigurator_aspnetcore_Backend.Models
{
    public class Highscore
    {
        //[Key]
        public DateTime date { get; set; } = new DateTime();
        //[Key]
        public int gameMapId { get; set; }
        //[Key]
        public string username { get; set; } = string.Empty;
        public int score { get; set; }

        public GameMap gameMap { get; set; }
        public User user { get; set; }
    }
}
