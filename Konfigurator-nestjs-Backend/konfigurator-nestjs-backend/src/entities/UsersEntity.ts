import { Column, Entity, OneToMany } from "typeorm";
import { Highscores } from "./HighscoresEntity";
import { GameMaps } from "./GameMapsEntity";

@Entity("users")
export class Users {
  @Column("text", { primary: true, name: "username", unique: true })
  username: string;

  @Column("text", { name: "passwordHash" })
  passwordHash: string;

  @OneToMany(() => Highscores, (highscores) => highscores.username2)
  highscores: Highscores[];

  @OneToMany(() => GameMaps, (gameMaps) => gameMaps.username2)
  gameMaps: GameMaps[];
}
