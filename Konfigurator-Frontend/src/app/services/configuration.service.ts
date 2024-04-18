import { Injectable } from '@angular/core';
import { iif } from 'rxjs';
import { GetGameMapDto, VectorDto } from 'src/swagger';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() {
    this.configuration = {
      size: {x: 0, y: 0},
      tile: "",
      barrier: "",
      character: "",
      target: "",
      obstacles: [],
      startPos: {x: 0, y: 0},
      endPos: {x: 0, y: 0}
    }
  }

  public configuration: GetGameMapDto = {};

  public checkConfiguration(): [boolean, string]
  {
    if(this.configuration.size && this.configuration.size.y && this.configuration.size.x)
    {
      if(!(this.configuration.size.y > 0 && this.configuration.size.x > 0))
      {
        return [false, "invalid map size"];
      }
    }
    else
    {
      return [false, "invalid map size"];
    }
    if(this.configuration.startPos && this.configuration.startPos.y != null && this.configuration.startPos.x != null)
    {
      if(!(this.configuration.startPos.y > -1 && this.configuration.startPos.x > -1 && this.configuration.startPos.y <= this.configuration.size.y && this.configuration.startPos.x <= this.configuration.size.x))
      {
        return [false, "invalid starting Position"];
      }
    }
    else
    {
      return [false, "missing starting Position"];
    }
    if(this.configuration.endPos && this.configuration.endPos.y != null && this.configuration.endPos.x != null)
    {
      if(!(this.configuration.endPos.y >= 0 && this.configuration.endPos.x >= 0 && this.configuration.endPos.y < this.configuration.size.y && this.configuration.endPos.x < this.configuration.size.x))
      {
        return [false, "invalid target Position"];
      }
    }
    else
    {
      return [false, "missing target Position"];
    }

    if(!this.configuration.barrier)
    {
      return [false, "invalid barrier"];
    }
    else if(!this.configuration.character)
    {
      return [false, "invalid character"];
    }
    else if(!this.configuration.obstacles)
    {
      return [false, "invalid obstacles"];
    }
    else if(!this.configuration.target)
    {
      return [false, "invalid target"];
    }
    else if(!this.configuration.tile)
    {
      return [false, "invalid tile"];
    }

    if(!this.checkMap())
    {
      return [false, "target is not reachable"]
    }

    return [true, "valid"];
  }

  public checkMap(): boolean {

    var hindernisse: boolean[][] = [];

    for(let y = 0; y < this.configuration.size.y; y++)
    {
      var coloumn = []
      for(let x = 0; x < this.configuration.size.x; x++)
      {
        coloumn.push(false);
      }
      hindernisse.push(coloumn);
    }

    this.configuration.obstacles.forEach(element => {
      hindernisse[element.y][element.x] = true;
    });

    // Check Start and Target
    if (hindernisse[this.configuration.startPos.y][this.configuration.startPos.x]) {
        return false;
    }

    if (hindernisse[this.configuration.endPos.y][this.configuration.endPos.x]) {
        return false;
    }

    // Begin BFS
    var visited: boolean[][] = [];
    var queue: VectorDto[] = [];
    var currentPosition: VectorDto = this.configuration.startPos;

    for(let y = 0; y < this.configuration.size.y; y++)
    {
      var coloumn = []
      for(let x = 0; x < this.configuration.size.x; x++)
      {
        coloumn.push(false);
      }
      visited.push(coloumn);
    }

    visited[currentPosition.y][currentPosition.x] = true;
    while(true)
    {
        //console.log("currentPosition: x=" + currentPosition.x + " y=" + currentPosition.y + " endPos: x=" + this.configuration.endPos.x + " y=" + this.configuration.endPos.y)
        if(this.inRange(currentPosition.y + 1,currentPosition.x))
        {
          if(!visited[currentPosition.y + 1][currentPosition.x])
          {
            visited[currentPosition.y + 1][currentPosition.x] = true;
            if(!hindernisse[currentPosition.y + 1][currentPosition.x])
            {
              queue.push({x: currentPosition.x, y: currentPosition.y + 1});
            }
          }
        }

        if(this.inRange(currentPosition.y - 1,currentPosition.x))
        {
          if(!visited[currentPosition.y - 1][currentPosition.x])
          {
            visited[currentPosition.y - 1][currentPosition.x] = true;
            if(!hindernisse[currentPosition.y - 1][currentPosition.x])
            {
              queue.push({x: currentPosition.x , y: currentPosition.y - 1});
            }
          }
        }

        if(this.inRange(currentPosition.y, currentPosition.x + 1))
        {
          if(!visited[currentPosition.y][currentPosition.x + 1])
          {
            visited[currentPosition.y][currentPosition.x + 1] = true;
            if(!hindernisse[currentPosition.y][currentPosition.x + 1])
            {
              queue.push({x: currentPosition.x + 1, y: currentPosition.y});
            }
          }
        }

        if(this.inRange(currentPosition.y, currentPosition.x - 1))
        {
          if(!visited[currentPosition.y][currentPosition.x - 1])
          {
            visited[currentPosition.y][currentPosition.x - 1] = true;
            if(!hindernisse[currentPosition.y][currentPosition.x - 1])
            {
              queue.push({x: currentPosition.x - 1, y: currentPosition.y});
            }
          }
        }


        if(queue.length == 0)
        {
          return false;
        }
        currentPosition = queue.pop();

        if(currentPosition.x == this.configuration.endPos.x && currentPosition.y == this.configuration.endPos.y)
        {
          //console.log("Return True");
          return true;
        }
    }

    return true;
  }

  private inRange(y: number, x: number): boolean
  {
    if(x >= this.configuration.size.x || x < 0 || y >= this.configuration.size.y || y < 0)
    {
      //console.log("x: " + x + " y: " + y + " => false");

      return false;
    }
    else
    {
      //console.log("x: " + x + " y: " + y + " => true");

      return true;
    }
  }

}
