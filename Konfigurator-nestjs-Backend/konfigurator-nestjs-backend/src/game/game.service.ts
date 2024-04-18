import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ServiceResponseDto } from 'src/dto/ServiceResponse.dto';
import { GetGameMapDto } from 'src/dto/get-GameMap.dto';
import { GetGameMapResponseDto } from 'src/dto/get-GameMapResponse.dto';
import { GetHighscoresDto } from '../dto/get-Highscores.dto'
import { GameMaps } from 'src/entities/GameMapsEntity';
import { Highscores } from 'src/entities/HighscoresEntity';
import { VectorDto } from 'src/dto/Vector.dto';
import { MapSizeDto } from 'src/dto/MapSize.dto';
import { GetAllGameMapIdDto } from 'src/dto/get-AllGameMapId.dto';
import { BarrierDesigns } from 'src/entities/BarrierDesignsEntity';
import { CharacterDesigns } from 'src/entities/CharacterDesignsEntity';
import { TargetDesigns } from 'src/entities/TargetDesignsEntity';
import { TileDesigns } from 'src/entities/TileDesignsEntity';
import { ObstaclesInMaps } from 'src/entities/ObstaclesInMapsEntity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameMaps) private gameMapsRepository: Repository<GameMaps>,
    @InjectRepository(Highscores) private highscoresRepository: Repository<Highscores>,
    @InjectRepository(BarrierDesigns) private barrierDesignsRepository: Repository<BarrierDesigns>,
    @InjectRepository(CharacterDesigns) private characterDesignsRepositroy: Repository<CharacterDesigns>,
    @InjectRepository(TargetDesigns) private targetDesignsRepositroy: Repository<TargetDesigns>,
    @InjectRepository(TileDesigns) private tileDesignsRepositroy: Repository<TileDesigns>,
    @InjectRepository(ObstaclesInMaps) private ObstaclesInMapsRepository: Repository<ObstaclesInMaps>
  ) {}

  async GetHighscores(gameMapId: number) {

    let highscores = await this.highscoresRepository.find();
    let highscoresDtos: GetHighscoresDto[] = [];

    // Fill highscore array
    highscores.forEach(score =>{
      if(score.gameMapId == gameMapId)
      {
        let newScore: GetHighscoresDto = new GetHighscoresDto(score.date,score.gameMapId,score.username,score.score); 
        highscoresDtos.push(newScore);
      }
    })

    if(highscoresDtos.length == 0)
      return new ServiceResponseDto<GetHighscoresDto[]>(null,false,"Keine Highscores gefunden");
    else
      return new ServiceResponseDto<GetHighscoresDto[]>(highscoresDtos,true,"Highscores verfügbar");
  }

  async GetGameMap(gameMapId: number) {

    let gameMap = await this.gameMapsRepository.find()
    let obstaclesInMaps = await this.ObstaclesInMapsRepository.find();

    let obstaclesInMapdto: VectorDto[] = [];
    let getGameMapDto: GetGameMapDto;

    if(gameMap == null)
      return new ServiceResponseDto<GetGameMapResponseDto[]>(null,false,"Keine GameMap gefunden");
    
    /*
     * Werte mappen
     */
    obstaclesInMaps.forEach(element => {
      if(element.gameMapId == gameMapId)
        obstaclesInMapdto.push(new VectorDto(element.x,element.y))
    })

    gameMap.forEach(element => {
      if(element.gameMapId == gameMapId)
      {
        let newsize = new MapSizeDto(element.sizeX,element.sizeY);
        let startpos = new VectorDto(element.startPosX, element.startPosY);
        let endpos = new VectorDto(element.endPosX, element.endPosY);

        let newgamemap: GetGameMapDto = new GetGameMapDto(
          element.gameMapId,
          element.name,
          element.username,
          newsize,
          element.tile,
          element.barrier,
          element.character,
          element.target,
          obstaclesInMapdto,
          startpos,
          endpos);
          getGameMapDto = newgamemap;
      }
    })

    let response = new GetGameMapResponseDto(getGameMapDto);

    return new ServiceResponseDto<GetGameMapResponseDto>(response,true,"Game Map verfügbar")
  }

  async GetAllGameMapsIds() {

    let gameMaps = await this.gameMapsRepository.find();
    let id: number[] = []
    // let GameMapIdDto: GetAllGameMapIdDto[] = [];

    gameMaps.forEach(gm =>{
      if (gm != null)
      {
        id.push(gm.gameMapId)
      }
    })

    let GameMapIdDto = new GetAllGameMapIdDto(id);
    
    if (gameMaps.length == 0)
      return new ServiceResponseDto<GetAllGameMapIdDto[]>(null,false,"Keine Ids verfügbar");
    else
      return new ServiceResponseDto<GetAllGameMapIdDto>(GameMapIdDto,true,"Gamemap Ids verfügbar");
  }

  async GetGraphic(graphic: string) {

    let barrierDesigns = await this.barrierDesignsRepository.find()
    let characterDesigns = await this.characterDesignsRepositroy.find();
    let targetDesigns = await this.targetDesignsRepositroy.find();
    let tileDesigns = await this.tileDesignsRepositroy.find();

    let data: any = null;

    barrierDesigns.forEach(element => {
      if(element.barrier == graphic) 
      {
        data = element.img.toString('base64');
      }
    });

    characterDesigns.forEach(element => {
      if(element.character == graphic) 
      {
        data = element.img.toString('base64');
      }
    });

    targetDesigns.forEach(element => {
      if(element.target == graphic) 
      {
        data = element.img.toString('base64');
      }
    });

    tileDesigns.forEach(element => {
      if(element.tile == graphic) 
      {
        data = element.img.toString('base64');
      }
    });

    if(data != null)
      return new ServiceResponseDto<Buffer[]>(data,true,"Grafik verfügbar")
    else
      return new ServiceResponseDto<Buffer[]>(data,false,"Grafik nicht verfügbar")

  }

  async addHighscore(gameMapId: number, username: string, score: number) {

    let highscores = new Highscores;

    highscores.date = new Date().toString();
    highscores.gameMapId = gameMapId;
    highscores.score = score;
    highscores.username = username;

    await this.highscoresRepository.save(highscores);

    return new ServiceResponseDto<string>("",true,"Hinzufügen erfolgt");


  }
}
