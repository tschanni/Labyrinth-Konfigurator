using Konfigurator_aspnetcore_Backend.Models;
using Konfigurator_aspnetcore_Backend.Models.DTOs;
using System.Threading.Tasks;

namespace Konfigurator_aspnetcore_Backend.Services.Game
{
    public interface IGameService
    {
        Task<ServiceResponseDto<GetGameMapResponseDto>> GetGameMap(int gameMapId);
        Task<ServiceResponseDto<byte[]>> GetGraphic(string graphic);
        Task<ServiceResponseDto<GetHighscoresDto[]>> GetHighscores(int gameMapId);
        Task<ServiceResponse> AddHighscore(int gameMapId, string username, int score);

        Task<ServiceResponseDto<GetAllGameMapIdDto>> GetAllGameMapIds();
    }
}
