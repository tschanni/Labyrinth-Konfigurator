using System.ComponentModel.DataAnnotations;

namespace Konfigurator_aspnetcore_Backend.Models
{
    public class User
    {
        [Key]
        public string username { get; set; }
        public string passwordHash { get; set; }

        public List<GameMap> gameMaps { get; set; }
        public List<Highscore> highscores { get; set; }
    }
}
