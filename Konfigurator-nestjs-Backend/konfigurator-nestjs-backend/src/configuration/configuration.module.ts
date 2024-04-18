import { Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { ConfigurationController } from './configuration.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { BarrierDesigns } from 'src/entities/BarrierDesignsEntity';
import { CharacterDesigns } from 'src/entities/CharacterDesignsEntity';
import { TargetDesigns } from 'src/entities/TargetDesignsEntity';
import { TileDesigns } from 'src/entities/TileDesignsEntity';
import { GameMaps } from 'src/entities/GameMapsEntity';
import { Highscores } from 'src/entities/HighscoresEntity';
import { ObstaclesInMaps } from 'src/entities/ObstaclesInMapsEntity';
import { Users } from 'src/entities/UsersEntity';

@Module({
  imports: [TypeOrmModule.forFeature([BarrierDesigns, CharacterDesigns, GameMaps, Highscores, ObstaclesInMaps, TargetDesigns, TileDesigns, Users])],
  controllers: [ConfigurationController],
  providers: [ConfigurationService]
})
export class ConfigurationModule {}
