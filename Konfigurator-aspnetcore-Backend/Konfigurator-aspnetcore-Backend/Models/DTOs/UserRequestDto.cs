
namespace Konfigurator_aspnetcore_Backend.Models.DTOs
{
    public class UserRequestDto
    {
        public UserRequestDto(string username, string passwordHash)
        {
            this.username = username;
            this.passwordHash = passwordHash;
        }
        public string username { get; }
        public string passwordHash { get; }
    }
}
