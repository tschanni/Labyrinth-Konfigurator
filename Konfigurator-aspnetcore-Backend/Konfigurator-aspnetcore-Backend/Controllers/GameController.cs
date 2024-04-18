using Konfigurator_aspnetcore_Backend.Models;
using Konfigurator_aspnetcore_Backend.Models.DTOs;
using Konfigurator_aspnetcore_Backend.Services.Game;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Konfigurator_aspnetcore_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly IGameService _gameService;

        public GameController(IGameService gameService)
        {
            _gameService = gameService;
        }

        [HttpGet("{gameMapId:int}")]
        public async Task<ActionResult<ServiceResponseDto<GetGameMapResponseDto>>> GetGameMap(int gameMapId)
        {
            var response = await _gameService.GetGameMap(gameMapId);
            if(response.Success)
                return Ok(response.Data);
            return BadRequest(response.Message);
        }

        [HttpGet("getGameMaps")]
        public async Task<ActionResult<ServiceResponseDto<GetAllGameMapIdDto>>> GetAllGameMapIds()
        {
            var response = await _gameService.GetAllGameMapIds();
            if (response.Success)
                return Ok(response.Data);
            return BadRequest(response.Message);
        }

        [HttpGet("getGraphic")]
        public async Task<ActionResult<ServiceResponseDto<byte[]>>> GetGraphic(string graphic)
        {
            var response = await _gameService.GetGraphic(graphic);
            if(response.Success)
                return Ok(response.Data);
            return BadRequest(response.Message);
        }

        [HttpGet("getHighscores")]
        public async Task<ActionResult<ServiceResponseDto<GetHighscoresDto[]>>> GetHighscores(int gameMapId)
        {
            var response = await _gameService.GetHighscores(gameMapId);
            if (response.Success)
                return Ok(response.Data);
            return BadRequest(response.Message);
        }

        [HttpPost("addHighscore")]
        public async Task<ActionResult<ServiceResponse>> AddHighscore(int gameMapId, string username, int score)
        {
            var response = await _gameService.AddHighscore(gameMapId, username, score);
            if (response.Success)
                return Ok(response.Success);
            return BadRequest(response.Message);
        }
    }
}
