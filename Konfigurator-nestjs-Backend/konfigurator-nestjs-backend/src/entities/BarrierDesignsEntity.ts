import { Column, Entity, OneToMany } from "typeorm";
import { GameMaps } from "./GameMapsEntity";

@Entity("barrierDesigns")
export class BarrierDesigns {
  @Column("text", { primary: true, name: "barrier", unique: true })
  barrier: string;

  @Column("blob", { name: "img" })
  img: Buffer;

  @OneToMany(() => GameMaps, (gameMaps) => gameMaps.barrier2)
  gameMaps: GameMaps[];
}