namespace Konfigurator_aspnetcore_Backend.Models.DTOs
{
    public class UserResponseDto
    {
        public UserResponseDto(string username, string jwtToken)
        {
            this.username = username;
            this.jwtToken = jwtToken;
        }

        public string username { get; }
        public string jwtToken { get; }
    }
}
