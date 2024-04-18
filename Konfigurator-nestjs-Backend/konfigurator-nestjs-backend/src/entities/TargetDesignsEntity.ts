import { Column, Entity, OneToMany } from "typeorm";
import { GameMaps } from "./GameMapsEntity";

@Entity("targetDesigns")
export class TargetDesigns {
  @Column("text", { primary: true, name: "target", unique: true })
  target: string;

  @Column("blob", { name: "img" })
  img: Buffer;

  @OneToMany(() => GameMaps, (gameMaps) => gameMaps.target2)
  gameMaps: GameMaps[];
}
