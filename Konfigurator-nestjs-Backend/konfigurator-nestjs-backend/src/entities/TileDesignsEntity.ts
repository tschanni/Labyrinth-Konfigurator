import { Column, Entity, OneToMany } from "typeorm";
import { GameMaps } from "./GameMapsEntity";

@Entity("tileDesigns")
export class TileDesigns {
  @Column("text", { primary: true, name: "tile", unique: true })
  tile: string;

  @Column("blob", { name: "img" })
  img: Buffer;

  @OneToMany(() => GameMaps, (gameMaps) => gameMaps.tile2)
  gameMaps: GameMaps[];
}
