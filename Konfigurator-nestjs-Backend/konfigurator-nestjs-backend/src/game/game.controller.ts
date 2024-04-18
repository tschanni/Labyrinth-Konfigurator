import { Controller, Get, Post, Res, Param, Query } from '@nestjs/common';
import { GameService } from './game.service';
import { Response } from 'express';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('getHighscores?')
  async GetHighscore(@Res() response: Response, @Query('gameMapId') gameMapId: number) {
    const resp = await this.gameService.GetHighscores(gameMapId);

    if(resp.success) {
      return response.send(resp.data);
    }

    return response.status(400).send(resp.message);
  }

  @Get('getGameMaps')
  async GetAllGameMapId(@Res() response: Response) {
    const resp = await this.gameService.GetAllGameMapsIds();

    if(resp.success) {
      return response.send(resp.data);
    }

    return response.status(400).send(resp.message);
  }

  @Get('getGraphic?')
  async GetGraphic(@Res() response: Response, @Query('graphic') graphic:string) {
    const resp = await this.gameService.GetGraphic(graphic);

    if(resp.success) {
      return response.send('\"' + resp.data + '\"');
    }

    return response.status(400).send(resp.message);
  }

  @Get('/:gameMapId')
  async GetGameMap(@Res() response: Response, @Param('gameMapId') gameMapId: number) {
    const resp = await this.gameService.GetGameMap(gameMapId)

    if(resp.success) {
      return response.send(resp.data);
    }

    return response.status(400).send(resp.message);
  }

  @Post('addHighscore?')
  async addHighscore(@Res() response: Response, @Query('gameMapId') gameMapId: number, @Query('username') username: string, @Query('score') score: number) {
    console.log(gameMapId, username, score)
    const resp = await this.gameService.addHighscore(gameMapId,username,score);

    if(resp.success) {
      return response.send(resp.data);
    }

    return response.status(400).send(resp.message);
  }
}
