import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Highscores } from 'src/entities/HighscoresEntity';
import { GameMaps } from 'src/entities/GameMapsEntity';
import { BarrierDesigns } from 'src/entities/BarrierDesignsEntity';
import { CharacterDesigns } from 'src/entities/CharacterDesignsEntity';
import { TileDesigns } from 'src/entities/TileDesignsEntity';
import { TargetDesigns } from 'src/entities/TargetDesignsEntity';
import { ObstaclesInMaps } from 'src/entities/ObstaclesInMapsEntity';

@Module({
  imports: [TypeOrmModule.forFeature([Highscores, GameMaps, BarrierDesigns, CharacterDesigns, TargetDesigns, TileDesigns, ObstaclesInMaps])],
  controllers: [GameController],
  providers: [GameService]
})
export class GameModule {}
