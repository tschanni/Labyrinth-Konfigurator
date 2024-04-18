namespace Konfigurator_aspnetcore_Backend.Models.DTOs
{
    public class GetAllGameMapIdDto
    {
        public GetAllGameMapIdDto(int[] gameMapIds)
        {
            this.gameMapIds = gameMapIds;
        }
        public int[] gameMapIds { get; }
    }
}
