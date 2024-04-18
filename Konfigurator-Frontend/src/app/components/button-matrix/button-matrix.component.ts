import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { UnityService } from 'src/app/services/unity.service';

@Component({
  selector: 'app-button-matrix',
  templateUrl: './button-matrix.component.html',
  styleUrls: ['./button-matrix.component.scss']
})
export class ButtonMatrixComponent {
  public size: {x: number, y: number} = {x: 16, y: 9};


  public startPos: {x: number, y: number} = {x: -1, y: -1};
  public endPos: {x: number, y: number} = {x: -1, y: -1};

  public obstacles: boolean[][] = [];

  public state: number = 0; // 0: Start 1: End, 2: Obstacles

  @Output() playableEvent = new EventEmitter<[boolean, string]>();

  public startPic: string;
  public targetPic: string;
  public tilePic: string;
  public obstaclePic: string;

  public updatePic(): void {
    this.api.GetSprite(this.configurationService.configuration.tile).subscribe({next: obs => {this.tilePic = obs;
      //console.log("TItle: " + this.tilePic)
    }});
    this.api.GetSprite(this.configurationService.configuration.barrier).subscribe({next: obs => {this.obstaclePic = obs}});
    this.api.GetSprite(this.configurationService.configuration.target).subscribe({next: obs => {this.targetPic = obs}});
    this.api.GetSprite(this.configurationService.configuration.character).subscribe({next: obs => {this.startPic = obs}});
  }

  constructor(private unityService: UnityService, private configurationService: ConfigurationService, private api: ApiService) {
    //this.help = new [this.size.x][this.size.y];
    for(let y = 0; y < this.size.y; y++)
    {
      var coloumn = []
      for(let x = 0; x < this.size.x; x++)
      {
        coloumn.push(false);
      }
      this.obstacles.push(coloumn);
    }
    this.updatePic();
  }

  public changeObstacle(x: number, y: number): void
  {
    if(this.startPos.x == x && this.startPos.y == y)
      return;
    if(this.endPos.x == x && this.endPos.y == y)
      return;
    this.obstacles[x][y] = !this.obstacles[x][y];
  }

  public getPositionText(x: number, y: number): string
  {
    if(this.startPos.x == x && this.startPos.y == y)
      return "S";
    if(this.endPos.x == x && this.endPos.y == y)
      return "Z";
    if(this.obstacles[x][y])
      return "X"
    else
      return " "
  }

  public setStart(x: number, y: number): void
  {
    this.startPos = {x: x, y: y};
    this.setState(this.state + 1);
  }

  public setEnd(x: number, y: number): void
  {
    this.endPos = {x: x, y: y};
    this.setState(this.state + 1);

  }

  public setState(s: number): void
  {
    this.state = s;
  }

  public exportGameData(): void
  {
    //console.log(this.obstacles)
    this.configurationService.configuration.obstacles = [],
    this.configurationService.configuration.startPos = {x: this.startPos.y, y: this.normalizeY(this.startPos.x)},
    this.configurationService.configuration.endPos = {x: this.endPos.y, y: this.normalizeY(this.endPos.x)}
    for(let x = 0; x < this.size.y; x++)
    {
      for(let y = 0; y < this.size.x; y++)
      {
        if(this.obstacles.at(x)?.at(y))
        {
          this.configurationService.configuration.obstacles?.push({x: y, y: this.normalizeY(x)});
        }
      }
    }
  }

  public normalizeY(y: number): number {
    return this.size.y - y - 1;
  }

  public checkMap(): [boolean, string]
  {
    this.exportGameData();
    var toRet = this.configurationService.checkConfiguration();

    this.playableEvent.emit(toRet);
    return toRet;
  }

  public playable(): boolean
  {
    console.log("Playable: " + this.configurationService.checkConfiguration()[0])
    return this.configurationService.checkConfiguration()[0]
  }
}
