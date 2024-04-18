import { Injectable, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})


export class UnityService {

  unityInstance: any;

  toExecute: string;

  gameId: number;

  constructor(private router: Router, private ngZone: NgZone, private apiService: ApiService, private route: ActivatedRoute) {
    window.my = window.my || {};
    window.my.namespace = window.my.namespace || {};
    window.my.namespace.unityAddHighscore = this.UnityAddHighscore.bind(this);
    window.my.namespace.unityLoaded = this.UnityLoaded.bind(this);
   }

  public setUnityInstance(instance: any): void
  {
    this.unityInstance = instance;
  }

  public getUnityInstance(): void
  {
    return this.unityInstance;
  }

  public UnityAddHighscore(arg: any): void
  {
    //console.log("AddHighscore: " + arg);
    this.apiService.addHighscore(this.gameId, Math.round(arg));
    //this.highscores.push({name: })

  }


  public UnityLoaded(): void
  {
    console.log("toexecute: " + this.UnityLoaded);
    if(this.toExecute)
    {
      this.unityInstance.SendMessage('GameManager', 'LoadMap', this.toExecute);
    }
    else
    {
      this.unityInstance.SendMessage('GameManager', 'StartRandomGame');
      this.toExecute = 'loaded'
    }
  }

  public openGameWithMap(map: any): void
  {
    this.router.navigate(['/game']);
    this.gameId = -1;
    this.toExecute = JSON.stringify(map);
    //this.unityInstance.SendMessage('GameManager', 'LoadMap', JSON.stringify(map));
  }

  public openGameWithMapID(mapid: number): void
  {
    //this.router.navigate(['/game']);
    this.gameId = mapid;
    this.apiService.getGame(mapid).subscribe(data => {
      var obs = JSON.parse(JSON.stringify(data));
      console.log("OpenMap: " + JSON.stringify(obs.getGameMapDto));

      if(this.toExecute == 'loaded')
      {
        this.unityInstance.SendMessage('GameManager', 'LoadMap', JSON.stringify(obs.getGameMapDto));
      }
      else
      {
        this.toExecute = JSON.stringify(obs.getGameMapDto)
      }
    });
    //this.toExecute = JSON.stringify(map);
    //this.unityInstance.SendMessage('GameManager', 'LoadMap', JSON.stringify(map));
  }
}
