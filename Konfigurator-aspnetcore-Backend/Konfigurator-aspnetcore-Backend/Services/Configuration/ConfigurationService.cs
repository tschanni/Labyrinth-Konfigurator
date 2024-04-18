using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Konfigurator_aspnetcore_Backend.Models;
using Konfigurator_aspnetcore_Backend.Models.DTOs;
using Konfigurator_aspnetcore_Backend.Data;
using Microsoft.EntityFrameworkCore;

namespace Konfigurator_aspnetcore_Backend.Services.Configuration
{
	public class ConfigurationService : IConfigurationService
	{
		private readonly LabyrinthKonfiguratorContext _context;

		public ConfigurationService(LabyrinthKonfiguratorContext context)
		{
			_context = context;
		}

		public async Task<ServiceResponseDto<GetConfigurationDataResponseDto>> GetConfigurationData()
		{
            // Response mit den fuer den gesamten Konfigurationsprozess notwendigen Daten erstellen

			// Daten aus der Datenbank auslesen
            var barrierDesigns = await _context.barrierDesigns.ToListAsync();
			var characterDesigns = await _context.characterDesigns.ToListAsync();
			var targetDesigns = await _context.targetDesigns.ToListAsync();
			var tileDesigns = await _context.tileDesigns.ToListAsync();

			var barrierDesignDtos = new List<DesignDto>();
			var characterDesignDtos = new List<DesignDto>();
			var targetDesignDtos = new List<DesignDto>();
			var tileDesignDtos = new List<DesignDto>();

			// Daten mappen
			foreach(var barrierDesign in barrierDesigns)
			{
				barrierDesignDtos.Add(new DesignDto(barrierDesign.barrier, barrierDesign.img));
			}

            foreach(var characterDesign in characterDesigns)
			{
				characterDesignDtos.Add(new DesignDto (characterDesign.character, characterDesign.img));
			}

			foreach(var targetDesign in  targetDesigns)
			{
				targetDesignDtos.Add(new DesignDto (targetDesign.target, targetDesign.img));
			}

			foreach(var tileDesign in tileDesigns)
			{
				tileDesignDtos.Add(new DesignDto (tileDesign.tile, tileDesign.img));
			}

			var response = new GetConfigurationDataResponseDto(
				barrierDesignDtos,
				characterDesignDtos,
				targetDesignDtos,
				tileDesignDtos);

            return new ServiceResponseDto<GetConfigurationDataResponseDto> { Data = response, Success = true };
		}

		public async Task<ServiceResponseDto<AddGameMapResponseDto>> CreateGame(AddGameMapRequestDto request)
		{
			/*
			 * Daten mappen
			 */

			// GameMap
			var gameMap = new GameMap
			{
				name = request.name,
				username = request.username,
				sizeX = request.size.x,
				sizeY = request.size.y,
				tile = request.tile,
				barrier = request.barrier,
				character = request.character,
				target = request.target,
				startPosX = request.startPos.x,
				startPosY = request.startPos.y,
				endPosX = request.endPos.x,
				endPosY = request.endPos.y
			};

			await _context.gameMaps.AddAsync(gameMap);
			await _context.SaveChangesAsync();

			int assigendGameMapId = gameMap.gameMapId;

			// ObstaclesInMap
			var obstaclesInMap = new List<ObstaclesInMap>();

			foreach (var obstacle in request.obstacles)
			{
				obstaclesInMap.Add(new ObstaclesInMap
				{
					gameMapId = assigendGameMapId,
					x = obstacle.x,
					y = obstacle.y
				});
			}

			foreach (var entry in obstaclesInMap)
			{
				await _context.AddAsync(entry);
			}
			await _context.SaveChangesAsync();

			// GameMapId der neu erstellen Map zurueckgeben
			AddGameMapResponseDto response = new AddGameMapResponseDto(assigendGameMapId);

			return new ServiceResponseDto<AddGameMapResponseDto> { Data = response, Success = true, Message = "Game gespeichert" };
		}
	}
}