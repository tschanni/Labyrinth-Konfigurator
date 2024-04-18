import { Column, Entity, OneToMany } from "typeorm";
import { GameMaps } from "./GameMapsEntity";

@Entity("characterDesigns")
export class CharacterDesigns {
  @Column("text", { primary: true, name: "character", unique: true })
  character: string;

  @Column("blob", { name: "img" })
  img: Buffer;

  @OneToMany(() => GameMaps, (gameMaps) => gameMaps.character2)
  gameMaps: GameMaps[];
}
