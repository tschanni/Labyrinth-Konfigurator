import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GetHighscoresDto } from 'src/swagger';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.scss']
})
export class HighscoreComponent implements OnInit {  

  private highscores: {name: string, score: number, date: Date}[] = [];

  constructor(private api: ApiService) {  }

  @Input() public mapId: number;

  ngOnInit(): void {
    this.updateHighscore();
    this.api.newHighscore.subscribe( obs => {this.updateHighscore()});
  }

  public getHighscores(): {name: string, score: number, date: Date}[] {    
    return this.highscores;
  }

  public updateHighscore(): void
  {
    this.api.getHighscores(this.mapId).subscribe( obs => {
      this.highscores = [];
      var highscores: Array<GetHighscoresDto> = JSON.parse(JSON.stringify(obs));
      highscores.forEach(score => {
        this.highscores.push({name: score.username, score: score.score, date: new Date(score.date)});
      });
      this.highscores.sort((a, b) => (a.score < b.score ? -1 : 1));
    });
  }
}
