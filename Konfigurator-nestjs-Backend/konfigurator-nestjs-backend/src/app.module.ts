import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule} from '@nestjs/typeorm';
import { ConfigurationModule } from './configuration/configuration.module';
import { GameModule } from './game/game.module';
import { BarrierDesigns } from './entities/BarrierDesignsEntity';
import { GameMaps } from './entities/GameMapsEntity';
import { CharacterDesigns } from './entities/CharacterDesignsEntity';
import { TargetDesigns } from './entities/TargetDesignsEntity';
import { TileDesigns } from './entities/TileDesignsEntity';
import { Highscores } from './entities/HighscoresEntity';
import { ObstaclesInMaps } from './entities/ObstaclesInMapsEntity';
import { Users } from './entities/UsersEntity';
import { UserManagementModule } from './user-management/user-management.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '../LabyrinthKonfigurator.db',
      entities: [BarrierDesigns, CharacterDesigns, GameMaps, Highscores, ObstaclesInMaps, TargetDesigns, TileDesigns, Users]
    }),
    ConfigurationModule,
    UserManagementModule,
    GameModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}