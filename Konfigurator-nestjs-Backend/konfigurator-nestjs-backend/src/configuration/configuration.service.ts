import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BarrierDesigns } from 'src/entities/BarrierDesignsEntity';
import { CharacterDesigns } from 'src/entities/CharacterDesignsEntity';
import { TargetDesigns } from 'src/entities/TargetDesignsEntity';
import { TileDesigns } from 'src/entities/TileDesignsEntity';
import { GetConfigurationDataResponseDto } from '../dto/get-ConfigurationDataResponse.dto'
import { ServiceResponseDto } from 'src/dto/ServiceResponse.dto';
import { AddGameMapRequestDto } from 'src/dto/add-GameMapRequest.dto';
import { GameMaps } from 'src/entities/GameMapsEntity';
import { ObstaclesInMaps } from 'src/entities/ObstaclesInMapsEntity';
import { AddGameMapResponseDto } from 'src/dto/add-GameMapResponse.dto';
import { DesignsDto } from 'src/dto/Designs.dto';

@Injectable()
export class ConfigurationService {
  constructor(
    @InjectRepository(BarrierDesigns) private barrierDesignsRepository: Repository<BarrierDesigns>,
    @InjectRepository(CharacterDesigns) private characterDesignsRepositroy: Repository<CharacterDesigns>,
    @InjectRepository(TargetDesigns) private targetDesignsRepositroy: Repository<TargetDesigns>,
    @InjectRepository(TileDesigns) private tileDesignsRepositroy: Repository<TileDesigns>,
    @InjectRepository(GameMaps) private gameMapsRepositroy: Repository<GameMaps>,
    @InjectRepository(ObstaclesInMaps) private obstaclesInMapsRepositroy: Repository<ObstaclesInMaps>
  ) {}

  // Response mit den fuer den gesamten Konfigurationsprozess notwendigen Daten erstellen
  async GetConfigurationData() {
    // Daten aus der Datenbank auslesen
    let barrierDesigns = await this.barrierDesignsRepository.find();
    let characterDesigns = await this.characterDesignsRepositroy.find();
    let targetDesigns = await this.targetDesignsRepositroy.find();
    let tileDesigns = await this.tileDesignsRepositroy.find();

    let barrierDesignDtos: DesignsDto[] = [];
    let characterDesignDtos: DesignsDto[] = [];
    let targetDesignDtos: DesignsDto[] = [];
    let tileDesignDtos: DesignsDto[] = [];

    /*
     * Daten mappen
     */

    barrierDesigns.forEach(element => {
      let designTemp = new DesignsDto(element.barrier, element.img.toString('base64'));

      barrierDesignDtos.push(designTemp);
    });

    characterDesigns.forEach(element => {
      let designTemp = new DesignsDto(element.character, element.img.toString('base64'));

      characterDesignDtos.push(designTemp);
    });

    targetDesigns.forEach(element => {
      let designTemp = new DesignsDto(element.target, element.img.toString('base64'));

      targetDesignDtos.push(designTemp);
    });

    tileDesigns.forEach(element => {
      let designTemp = new DesignsDto(element.tile, element.img.toString('base64'));

      tileDesignDtos.push(designTemp);
    });

    let response = new GetConfigurationDataResponseDto(
      barrierDesignDtos,
      characterDesignDtos,
      targetDesignDtos,
      tileDesignDtos);

    return new ServiceResponseDto<GetConfigurationDataResponseDto>(response, true, "Daten abgerufen");
  }


  async CreateGame(request: AddGameMapRequestDto) {
    const gameMap = new GameMaps();
    gameMap.name = request.name;
    gameMap.username = request.username;
    gameMap.sizeX = request.size.x;
    gameMap.sizeY = request.size.y;
    gameMap.tile = request.tile;
    gameMap.barrier = request.barrier;
    gameMap.character = request.character;
    gameMap.target = request.target;
    gameMap.startPosX = request.startPos.x;
    gameMap.startPosY = request.startPos.y;
    gameMap.endPosX = request.endPos.x;
    gameMap.endPosY = request.endPos.y;

    const assignedGameMap = await this.gameMapsRepositroy.save(gameMap);

    // ObstaclesInMap
    let obstaclesInMaps: ObstaclesInMaps[] = [];

    request.obstacles.forEach(element => {
      let obstaclesInMapsTemp = new ObstaclesInMaps;
      obstaclesInMapsTemp.gameMapId = assignedGameMap.gameMapId;
      obstaclesInMapsTemp.x = element.x;
      obstaclesInMapsTemp.y = element.y;

      obstaclesInMaps.push(obstaclesInMapsTemp);
    })

    obstaclesInMaps.forEach(async element => {
      await this.obstaclesInMapsRepositroy.save(element);
    })

    // GameMapId der neu erstellen Map zurueckgeben
    const response = new AddGameMapResponseDto(assignedGameMap.gameMapId);

    return new ServiceResponseDto<AddGameMapResponseDto>(response, true, "Game gespeichert");
  }
}
