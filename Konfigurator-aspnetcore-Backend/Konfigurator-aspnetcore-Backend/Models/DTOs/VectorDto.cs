namespace Konfigurator_aspnetcore_Backend.Models.DTOs
{
    public class VectorDto
    {
        public VectorDto(int x, int y)
        {
            this.x = x;
            this.y = y;
        }
        public int x { get; }
        public int y { get; }
    }
}
