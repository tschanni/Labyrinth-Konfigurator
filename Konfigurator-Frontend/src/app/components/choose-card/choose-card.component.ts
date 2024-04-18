import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-choose-card',
  templateUrl: './choose-card.component.html',
  styleUrls: ['./choose-card.component.scss']
})
export class ChooseCardComponent {

  @Input() public state: number = 1;

  @Input() public clicked: string = '';
  

  toggle(event: Event): void{
    let elementId = (event.target as Element).id;

    this.clicked = elementId;
    if(this.state == 1)
    {
      console.log("SetTile: " + elementId);
      this.configurationService.configuration.tile = elementId;
    }
    else if(this.state == 2)
    {
      console.log("SetObstacle: " + elementId);
      this.configurationService.configuration.barrier = elementId;
      //this.configurationService.configuration.barrier = "Hindernis 10.png";
    }
    else if(this.state == 3)
    {
      console.log("SetTarget: " + elementId);
      this.configurationService.configuration.target = elementId;
      //this.configurationService.configuration.target = "Ziel 193.png";
    }
    else if(this.state == 4)
    {
      console.log("SetCharacter: " + elementId);
      this.configurationService.configuration.character = elementId;
      //this.configurationService.configuration.character = "11_idle_down_0.png";
    }
  }

  constructor(private configurationService: ConfigurationService, private api: ApiService) {  }

  ngOnInit(): void {
    this.api.GetConfigurationSteps().subscribe({next: obs => {
      this.tiles = obs[0];
      this.barriers = obs[1];
      this.targets = obs[2];
      this.character = obs[3];
    }});
  }

  
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  public getCards(): any
  {
    if(this.state == 1)
    {
      return this.tiles;
    }
    else if(this.state == 2)
    {
      return this.barriers;
    }
    else if(this.state == 3)
    {
      return this.targets
    }
    else if(this.state == 4)
    {
      return this.character;
    }
    return null;
  }

  character = [];
  targets = [];
  tiles = [];
  barriers = [];

}
