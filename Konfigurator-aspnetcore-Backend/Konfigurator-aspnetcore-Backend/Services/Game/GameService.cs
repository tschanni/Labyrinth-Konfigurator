using Konfigurator_aspnetcore_Backend.Data;
using Konfigurator_aspnetcore_Backend.Models;
using Konfigurator_aspnetcore_Backend.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Konfigurator_aspnetcore_Backend.Services.Game
{
    public class GameService : IGameService
    {
        private readonly LabyrinthKonfiguratorContext _context;
        public GameService(LabyrinthKonfiguratorContext context)
        {
            _context = context;
        }
        public async Task<ServiceResponseDto<GetGameMapResponseDto>> GetGameMap(int gameMapId)
        {
            // Daten aus Datenbank auslesen
            var gameMap = await _context.gameMaps
                .Include(gm => gm.barrierDesign)
                .Include(gm => gm.characterDesign)
                .Include(gm => gm.targetDesign)
                .Include(gm => gm.tileDesign)
                .Include(gm => gm.obstaclesInMaps)
                .Include(gm => gm.highscores)
                .FirstOrDefaultAsync(gm => gm.gameMapId == gameMapId);

            // wurde keine GameMap zur gegebenen gameMapId gefunden
            if(gameMap == null)
            {
                return new ServiceResponseDto<GetGameMapResponseDto> { Success = false, Message = "gesuchte GameMap nicht vorhanden" };
            }

            /*
             * Werte mappen
             */
            var obstaclesInMap = new List<VectorDto>();

            foreach(var element in gameMap.obstaclesInMaps)
            {
                obstaclesInMap.Add(new VectorDto(element.x, element.y));
            }

            var getGameMapDto = new GetGameMapDto(
                gameMap.gameMapId,
                gameMap.name,
                gameMap.username,
                new MapSizeDto(gameMap.sizeX, gameMap.sizeY),
                gameMap.tile,
                gameMap.barrier,
                gameMap.character,
                gameMap.target,
                obstaclesInMap,
                new VectorDto(gameMap.startPosX, gameMap.startPosY),
                new VectorDto(gameMap.endPosX, gameMap.endPosY));

            var response = new GetGameMapResponseDto(getGameMapDto);

            return new ServiceResponseDto<GetGameMapResponseDto> { Data = response, Success = true };
        }

        public async Task<ServiceResponseDto<GetHighscoresDto[]>> GetHighscores(int gameMapId)
        {
            var highscores = await _context.highscores.ToArrayAsync();

            List<GetHighscoresDto> response = new List<GetHighscoresDto>();

            foreach (Highscore score in highscores)
            {
                if(score.gameMapId == gameMapId)
                {
                    response.Add(new GetHighscoresDto(score.date, score.gameMapId, score.username, score.score));
                }
            }

            if(response.Count == 0)
            {
                return new ServiceResponseDto<GetHighscoresDto[]> { Success = false };
            }
            var toret = response.ToArray();
            return new ServiceResponseDto<GetHighscoresDto[]> { Data = toret, Success = true };
        }

        public async Task<ServiceResponse> AddHighscore(int gameMapId, string username, int score)
        {
            Highscore newScore = new Highscore();

            newScore.date = DateTime.Now;
            newScore.username = username;
            newScore.gameMapId = gameMapId;
            newScore.score = score;

            await _context.highscores.AddAsync(newScore);
            await _context.SaveChangesAsync();

            return new ServiceResponse { Success = true, Message = "Score: " + score + " von: " + username + " zu map: " + gameMapId + " in Datenbank gespeichert" };
        }



        public async Task<ServiceResponseDto<GetAllGameMapIdDto>> GetAllGameMapIds()
        {
            // Daten aus Datenbank auslesen
            var gameMaps = await _context.gameMaps.ToArrayAsync();

            // wurde keine GameMaps gefunden
            if (gameMaps.Length == 0)
            {
                return new ServiceResponseDto<GetAllGameMapIdDto> { Success = false, Message = "keine GameMaps vorhanden" };
            }

            /*
             * Werte mappen
             */

            List<int> ids = new List<int>();

            foreach (GameMap gm in gameMaps)
            {
                if (gm != null)
                {
                    ids.Add(gm.gameMapId);
                }
            }

            var response = new GetAllGameMapIdDto(ids.ToArray());

            return new ServiceResponseDto<GetAllGameMapIdDto> { Data = response, Success = true };
        }

        public async Task<ServiceResponseDto<byte[]>> GetGraphic(string graphic)
        {
            var response = new ServiceResponseDto<byte[]> { Success = true };

            // alle vier Tabellen mit Grafiken nach der gesuchten Grafik durchsuchen
            var barrier = await _context.barrierDesigns.FindAsync(graphic);
            if (barrier != null)
            {
                response.Data = barrier.img;
                return response;
            }

            var character = await _context.characterDesigns.FindAsync(graphic);
            if(character != null)
            {
                response.Data = character.img;
                return response;
            }

            var target = await _context.targetDesigns.FindAsync(graphic);
            if(target != null)
            {
                response.Data = target.img;
                return response;
            }

            var tile = await _context.tileDesigns.FindAsync(graphic);
            if(tile != null)
            {
                response.Data = tile.img;
                return response;
            }

            // nicht gefunden
            response.Success = false;
            response.Message = "Grafik nicht gefunden";
            return response;
        }
    }
}
