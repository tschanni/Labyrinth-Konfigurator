namespace Konfigurator_aspnetcore_Backend.Models.DTOs
{
    public class GetGameMapDto : AbstractGameMapDto
    {
        public GetGameMapDto(
            int id,
            string name,
            string username,
            MapSizeDto size,
            string tile,
            string barrier,
            string character,
            string target,
            List<VectorDto> obstacles,
            VectorDto startPos,
            VectorDto endPos) : base(
                name,
                username,
                size,
                tile,
                barrier,
                character,
                target,
                obstacles,
                startPos,
                endPos)
        {
            this.id = id;
        }

        public int id { get; }
    }
}
