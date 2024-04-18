namespace Konfigurator_aspnetcore_Backend.Models.DTOs
{
    public class DesignDto
    {
        public DesignDto(string name, byte[] img)
        {
            this.name = name;
            this.img = img;
        }

        public string name { get; }
        public byte[] img { get; }
    }
}
