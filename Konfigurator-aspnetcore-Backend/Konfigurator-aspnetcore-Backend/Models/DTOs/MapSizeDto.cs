namespace Konfigurator_aspnetcore_Backend.Models.DTOs
{
    public class MapSizeDto
    {
        public MapSizeDto(int x, int y)
        {
            this.x = x;
            this.y = y;
        }
        public int x { get; }
        public int y { get; }
    }
}
