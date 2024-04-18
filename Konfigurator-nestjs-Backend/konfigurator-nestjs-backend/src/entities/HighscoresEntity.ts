import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./UsersEntity";
import { GameMaps } from "./GameMapsEntity";

@Index("IX_highscores_username", ["username"], {})
@Index("IX_highscores_gameMapId", ["gameMapId"], {})
@Entity("highscores")
export class Highscores {
  @Column("text", { primary: true, name: "date" })
  date: string;

  @Column("integer", { primary: true, name: "gameMapId" })
  gameMapId: number;

  @Column("text", { primary: true, name: "username" })
  username: string;

  @Column("integer", { name: "score" })
  score: number;

  @ManyToOne(() => Users, (users) => users.highscores, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "username", referencedColumnName: "username" }])
  username2: Users;

  @ManyToOne(() => GameMaps, (gameMaps) => gameMaps.highscores, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "gameMapId", referencedColumnName: "gameMapId" }])
  gameMap: GameMaps;
}
