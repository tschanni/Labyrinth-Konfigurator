namespace Konfigurator_aspnetcore_Backend.Models.DTOs
{
    public abstract class AbstractGameMapDto
    {
        public AbstractGameMapDto(
            string name,
            string username,
            MapSizeDto size,
            string tile,
            string barrier,
            string character,
            string target,
            List<VectorDto> obstacles,
            VectorDto startPos,
            VectorDto endPos)
        {
            this.name = name;
            this.username = username;
            this.size = size;
            this.tile = tile;
            this.barrier = barrier;
            this.character = character;
            this.target = target;
            this.obstacles = obstacles;
            this.startPos = startPos;
            this.endPos = endPos;
        }

        public string name { get; }
        public string username { get; }
        public MapSizeDto size { get; }
        public string tile { get; }
        public string barrier { get; }
        public string character { get; }
        public string target { get; }
        public List<VectorDto> obstacles { get; }
        public VectorDto startPos { get; }
        public VectorDto endPos { get; }
    }
}
