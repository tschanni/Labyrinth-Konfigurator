import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { ObstaclesInMaps } from "./ObstaclesInMapsEntity";
  import { Highscores } from "./HighscoresEntity";
  import { Users } from "./UsersEntity";
  import { TileDesigns } from "./TileDesignsEntity";
  import { TargetDesigns } from "./TargetDesignsEntity";
  import { CharacterDesigns } from "./CharacterDesignsEntity";
  import { BarrierDesigns } from "./BarrierDesignsEntity";
  
  @Index("IX_gameMaps_username", ["username"], {})
  @Index("IX_gameMaps_tile", ["tile"], {})
  @Index("IX_gameMaps_target", ["target"], {})
  @Index("IX_gameMaps_character", ["character"], {})
  @Index("IX_gameMaps_barrier", ["barrier"], {})
  @Entity("gameMaps")
  export class GameMaps {
    @PrimaryGeneratedColumn({ type: "integer", name: "gameMapId" })
    gameMapId: number;
  
    @Column("text", { name: "barrier" })
    barrier: string;
  
    @Column("text", { name: "character" })
    character: string;
  
    @Column("integer", { name: "endPosX" })
    endPosX: number;
  
    @Column("integer", { name: "endPosY" })
    endPosY: number;
  
    @Column("text", { name: "name" })
    name: string;
  
    @Column("integer", { name: "sizeX" })
    sizeX: number;
  
    @Column("integer", { name: "sizeY" })
    sizeY: number;
  
    @Column("integer", { name: "startPosX" })
    startPosX: number;
  
    @Column("integer", { name: "startPosY" })
    startPosY: number;
  
    @Column("text", { name: "target" })
    target: string;
  
    @Column("text", { name: "tile" })
    tile: string;
  
    @Column("text", { name: "username" })
    username: string;
  
    @OneToMany(
      () => ObstaclesInMaps,
      (obstaclesInMaps) => obstaclesInMaps.gameMap
    )
    obstaclesInMaps: ObstaclesInMaps[];
  
    @OneToMany(() => Highscores, (highscores) => highscores.gameMap)
    highscores: Highscores[];
  
    @ManyToOne(() => Users, (users) => users.gameMaps, { onDelete: "CASCADE" })
    @JoinColumn([{ name: "username", referencedColumnName: "username" }])
    username2: Users;
  
    @ManyToOne(() => TileDesigns, (tileDesigns) => tileDesigns.gameMaps, {
      onDelete: "CASCADE",
    })
    @JoinColumn([{ name: "tile", referencedColumnName: "tile" }])
    tile2: TileDesigns;
  
    @ManyToOne(() => TargetDesigns, (targetDesigns) => targetDesigns.gameMaps, {
      onDelete: "CASCADE",
    })
    @JoinColumn([{ name: "target", referencedColumnName: "target" }])
    target2: TargetDesigns;
  
    @ManyToOne(
      () => CharacterDesigns,
      (characterDesigns) => characterDesigns.gameMaps,
      { onDelete: "CASCADE" }
    )
    @JoinColumn([{ name: "character", referencedColumnName: "character" }])
    character2: CharacterDesigns;
  
    @ManyToOne(
      () => BarrierDesigns,
      (barrierDesigns) => barrierDesigns.gameMaps,
      { onDelete: "CASCADE" }
    )
    @JoinColumn([{ name: "barrier", referencedColumnName: "barrier" }])
    barrier2: BarrierDesigns;
  }
  