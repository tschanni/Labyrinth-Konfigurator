import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { GetGameMapDto } from 'src/swagger/model/getGameMapDto';

@Component({
  selector: 'app-game-map-viewer',
  templateUrl: './game-map-viewer.component.html',
  styleUrls: ['./game-map-viewer.component.scss']
})
export class GameMapViewerComponent implements OnInit {

  @Input() public gameId: number;

  public GameMap: GetGameMapDto = {name:''};

  public startPic: string;
  public targetPic: string;
  public tilePic: string;
  public obstaclePic: string;

  public obstacles: boolean[][] = [];


  constructor(private api: ApiService, public configurationService: ConfigurationService) {

  }

  ngOnInit(): void {
    if(this.gameId == -1)
    {
      this.GameMap = this.configurationService.configuration;
      this.initParameters();
    }
    else {
      this.api.getGame(this.gameId).subscribe({next: obs => {
        var map: GetGameMapDto = JSON.parse(JSON.stringify(obs.getGameMapDto));
        console.log(JSON.stringify(map))
        this.GameMap = map;
        this.initParameters();
      }})
    }
  }

  initParameters(): void {
    for(let y = 0; y < this.GameMap.size.y; y++)
    {
      var coloumn = []
      for(let x = 0; x < this.GameMap.size.x; x++)
      {
        coloumn.push(false);
      }
      this.obstacles.push(coloumn);
    }

    this.GameMap.obstacles.forEach(element => {
      this.obstacles[element.y][element.x] = true;
    });
    this.updatePic();
  }

  public getPositionText(y: number, x: number): string
  {
    y = this.GameMap.size.y - y - 1;
    if(this.GameMap.startPos.x == x && this.GameMap.startPos.y == y)
      return "S";
    if(this.GameMap.endPos.x == x && this.GameMap.endPos.y == y)
      return "Z";
    if(this.obstacles[y][x])
      return "X"
    else
      return " "
  }

  public updatePic(): void {
    this.api.GetSprite(this.GameMap.tile).subscribe({next: obs => {this.tilePic = obs;    }});
    this.api.GetSprite(this.GameMap.barrier).subscribe({next: obs => {this.obstaclePic = obs}});
    this.api.GetSprite(this.GameMap.target).subscribe({next: obs => {this.targetPic = obs}});
    this.api.GetSprite(this.GameMap.character).subscribe({next: obs => {this.startPic = obs}});
  }
}
