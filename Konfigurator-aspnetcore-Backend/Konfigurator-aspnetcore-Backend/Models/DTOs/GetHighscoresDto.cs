namespace Konfigurator_aspnetcore_Backend.Models.DTOs
{
    public class GetHighscoresDto
    {
        public GetHighscoresDto(DateTime date, int gameMapId, string username, int score)
        {
            this.date = date;
            this.gameMapId = gameMapId;
            this.username = username;
            this.score = score;
        }
        public DateTime date { get; }
        public int gameMapId { get; }
        public string username { get; }
        public int score { get; }
    }
}
