import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { GetAllGameMapIdDto, GetGameMapDto } from 'src/swagger';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {
  constructor(private api: ApiService, public storageService: StorageService) {

  }

  public liste: {id: number, name: string, creator: string}[] = [];

  ngOnInit(): void {
    this.api.getAllGameIds().subscribe(obs => {
      var ids: GetAllGameMapIdDto = JSON.parse(JSON.stringify(obs));
      if(ids.gameMapIds)
       {
        ids.gameMapIds.forEach(id => {
          this.api.getGame(id).subscribe({next: obs => {
            var map: GetGameMapDto = JSON.parse(JSON.stringify(obs.getGameMapDto));
            //console.log(JSON.stringify(map))
            this.liste.push({id: id, name: map.name, creator: map.username});            
            //console.log("Map: "+ JSON.stringify({id: id, name: map.name, creator: map.username}))
          }})
        });
       }
    })
  }

}
