import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { StorageService } from 'src/app/services/storage.service';
import { UnityService } from 'src/app/services/unity.service';
import { ButtonMatrixComponent } from '../button-matrix/button-matrix.component';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss']
})
export class ConfiguratorComponent implements OnInit {

  @ViewChild(ButtonMatrixComponent)
  public child!: ButtonMatrixComponent;

  public playableValue: boolean = false;
  public playableMessage: string;

  mapName: string = '';

  playable(): boolean
  {
    return this.playableValue;
  }

  setPlayable(newState: [boolean, string]): void
  {
    this.playableValue = newState[0];
    if(this.playableValue)
    {
      this.playableMessage = ""
    }
    else 
    {
      this.playableMessage = "This map is not playable in its current state due to: " + newState[1];
    }
  }

  ngAfterContentChecked() {
    this.changeDetectorRef.detectChanges();
  }


  constructor(public configurationService: ConfigurationService, private changeDetectorRef: ChangeDetectorRef, private api: ApiService, public storageService: StorageService, private unityService: UnityService){
    configurationService.configuration.size = {x: 16, y: 9};
  };

  ngOnInit(): void {

  }

  public playGame(): void {
    this.configurationService.configuration.name = this.mapName;
    this.unityService.openGameWithMap(this.configurationService.configuration);
  
  }

  public uploadGame(): void {
    this.configurationService.configuration.name = this.mapName;
    this.api.addGame(this.configurationService.configuration);
    this.step = 7;
  }

  public text: [string, string][] = [
    ["Step 1: Choose a Base plate", "In this step you can choose the design of the base plate for your labyrinth"],
    ["Step 2: Choose a Obstacle", "In the following step you can choose the design of the obstacle. It is only possible to choose one type of obstacles."],
    ["Step 3: Choose a Finish", "In the following step you can choose the design of the finish. It is only possible to choose one type of finish."],
    ["Step 4: Choose a Character", "In the following step you can choose the appearence of the character."],
    ["Step 5: Create the level", "In this step you can choose the position of the objects in the level. You can choose the starting point, the target and where the obstacles are located"],
    ["Step 6: Name and Submit the Level", "Give your created labyrinth a name and submit it to the database. The name will be visible to other players."],
    ["Congratulations", "You uploaded the Game and you should be redirected in a few moments."]
  ]

  public step: number = 1;

  public setStep(newStep: number): void
  {
    if(this.possibleStep(newStep))
    {
      this.step = newStep;
    }
    //console.log("NewStep: " + this.step);
    if(this.step == 5 && this.buttonMatrixFlag)
    {
      this.child.updatePic();
    }
  }


  public getChosen(): string
  {
    if(this.step == 1)
    {
      return this.configurationService.configuration.tile;
    }
    else if(this.step == 2)
    {
      return this.configurationService.configuration.barrier
    }
    else if(this.step == 3)
    {
      return this.configurationService.configuration.target;
    }
    else if(this.step == 4)
    {
      return this.configurationService.configuration.character;
    }
    return '';
  }

  public possibleStep(tryStep: number): boolean
  {
    if(tryStep > 0 && tryStep < 7)
    {
      if(tryStep > this.step)
        return this.checkForChecked();
      else
        return true;
    }
    else
    {
      return false;
    }
  }

  public checkForChecked(): boolean
  {
    if(this.step == 1)
    {
      if(this.configurationService.configuration.tile)
      {
        return true;
      }
    }
    else if(this.step == 2)
    {
      if(this.configurationService.configuration.barrier)
      {
        return true;
      }
    }
    else if(this.step == 3)
    {
      if(this.configurationService.configuration.target)
      {
        return true;
      }
    }
    else if(this.step == 4)
    {
      if(this.configurationService.configuration.character)
      {
        return true;
      }
    }
    else if(this.step == 5)
    {
      //console.log(this.configurationService.checkConfiguration())
      if(this.configurationService.checkConfiguration().at(0) == true)
      {
        return true;
      }
      else
      {
        alert(this.configurationService.checkConfiguration().at(1));
      }
    }

      return false;
  }

  private buttonMatrixFlag: boolean = false;

  public manageButtonMatrix(): boolean{
    if(this.step < 5 && this.buttonMatrixFlag == false)
    {
      return false;
    }
    else
    {
      if(this.buttonMatrixFlag == false)
      {
        this.buttonMatrixFlag = true;
      }
      return true;
    }
  }
}
