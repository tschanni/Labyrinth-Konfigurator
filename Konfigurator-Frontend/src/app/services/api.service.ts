import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserManagementService } from 'src/swagger/api/userManagement.service';
import { StringServiceResponseDto } from 'src/swagger/model/stringServiceResponseDto';
import { AddGameMapRequestDto, AddGameMapResponseDto, ConfigurationService, GameService, GetAllGameMapIdDtoServiceResponseDto, GetGameMapDto, GetGameMapResponseDtoServiceResponseDto, GetHighscoresDtoArrayServiceResponseDto } from 'src/swagger';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private highscores: {gameID: number, name: string, score: number}[] = [];

  constructor(
    private userService: UserManagementService,
    private configService: ConfigurationService,
    private gameService: GameService,
    private storageService: StorageService,
    private router: Router) { }




  public UserLogin(user:any, password:any): Observable<any> {
    return this.userService.userManagementLoginPost({username: user, passwordHash: password})
    // TODO: HASH PASSWORD
  }

  public UserRegistration(user:any,password:any):Observable<StringServiceResponseDto> {
    return this.userService.userManagementAddPost({username: user, passwordHash: password});
  }

  public GetSprite(spriteID: string): Observable<string>{
    return new Observable<string>(observer => {
      this.gameService.gameGetGraphicGet(spriteID).subscribe(obs => {
        //console.log(JSON.stringify(obs).replace('"', '').replace('"', ''))
        observer.next(JSON.stringify(obs).replace('"', '').replace('"', ''));
        observer.complete();
      })
    })
  }

  public GetConfigurationSteps(): Observable<any>{
    return new Observable(observer => {
      var tiles = [];
      var barriers = [];
      var targets = [];
      var characters = [];
      this.configService.configurationGetDataGet().subscribe({next: data => {
        var obs = JSON.parse(JSON.stringify(data));
        //console.log(JSON.stringify(data));
        obs.barrierDesignDtos.forEach(element => {
          barriers.push({title: element.name, img: element.img});
        });
        //console.log(JSON.stringify(barriers))
        obs.tileDesignDtos.forEach(element => {
          tiles.push({title: element.name, img: element.img});
        });
        obs.targetDesignDtos.forEach(element => {
          targets.push({title: element.name, img: element.img});
        });
        obs.characterDesignDtos.forEach(element => {
          if(element.name.endsWith("_idle_down_0.png"))
          {
            characters.push({title: element.name, img: element.img});
          }
        });
        observer.next([tiles, barriers, targets, characters]);
      }}),
      {complete() {
        observer.complete();
      }}
    });
  }

  public getHighscores(gameid: number): Observable<GetHighscoresDtoArrayServiceResponseDto>{
    return this.gameService.gameGetHighscoresGet(gameid);
  }

  public addHighscore(gameid: number, score: number)
  {
    //console.log("addscore" + JSON.stringify({gameID: gameid, name: this.storageService.getUser(), score: score}))
    if(this.storageService.isLoggedIn())
    {
      this.gameService.gameAddHighscorePost(gameid, this.storageService.getUser(), score).subscribe();
      this.newHighscore.next();

    }
  }

  public newHighscore: EventEmitter<void> = new EventEmitter<void>();

  public addGame(map: GetGameMapDto): void {
    this.configService.configurationAddGamePost({
      barrier: map.barrier,
      username: this.storageService.getUser(),
      character: map.character,
      endPos: map.endPos,
      name: map.name,
      obstacles: map.obstacles,
      size: map.size,
      startPos: map.startPos,
      target: map.target,
      tile: map.tile
    }).subscribe({next: data => {
      var obs: AddGameMapResponseDto = JSON.parse(JSON.stringify(data));
      //console.log("AddedGame with ID: " + obs.gameMapId);
      this.router.navigate(['/game', obs.gameMapId]);
    }})
  }

  public getGame(gameId: number): Observable<any>
  {
    return this.gameService.gameGameMapIdGet(gameId);
  }

  public getAllGameIds(): Observable<any>
  {
    return this.gameService.gameGetGameMapsGet();
  }

}
