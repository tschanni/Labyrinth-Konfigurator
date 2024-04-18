import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { GameMaps } from "./GameMapsEntity";

@Entity("obstaclesInMaps")
export class ObstaclesInMaps {
  @Column("integer", { primary: true, name: "gameMapId" })
  gameMapId: number;

  @Column("integer", { primary: true, name: "x" })
  x: number;

  @Column("integer", { primary: true, name: "y" })
  y: number;

  @ManyToOne(() => GameMaps, (gameMaps) => gameMaps.obstaclesInMaps, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "gameMapId", referencedColumnName: "gameMapId" }])
  gameMap: GameMaps;
}
