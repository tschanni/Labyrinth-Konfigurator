using System.Collections;
using System.Collections.Generic;
using Unity.Jobs;
using UnityEngine;

using System.IO;
using System.Net;
using Newtonsoft.Json.Linq;

[System.Serializable]
public class MapInfo
{
    public string bodenplatte;
    public string hindernis;
    public string ziel;
    public string character;
    
    [SerializeField]
    //public List<(int x, int y)> hindernisse;
    // True bei Hinderniss
    public bool[][] hindernisse;

    [SerializeField]
    public (int x, int y) size;

    [SerializeField]
    public (int x, int y) startPos;

    [SerializeField]
    public (int x, int y) endPos;

    public MapInfo((int x, int y) size)
    {
        this.size = size;
        hindernisse = new bool[size.x][];
        for (int x = 0; x < size.x; x++)
        {
            hindernisse[x] = new bool[size.y];
            for (int y = 0; y < size.y; y++)
            {
                if (Random.value > 0.5)
                {
                    hindernisse[x][y] = true;
                }
                else
                {
                    hindernisse[x][y] = false;
                }
            }
        }
        startPos = (
            0, 
            (Mathf.RoundToInt(Random.value * (size.y - 2)) + 1));
        endPos = (
            (size.x - 1), 
            (Mathf.RoundToInt(Random.value * (size.y - 2)) + 1));

        // Generates Random Appearence
        bodenplatte = "Bodenplatte " + (Mathf.RoundToInt(Random.value * 7) + 1).ToString();
        character = (Mathf.RoundToInt(Random.value * 10) + 1).ToString();
        hindernis = "Hindernis " + (Mathf.RoundToInt(Random.value * 9) + 1).ToString();
        ziel = "Ziel " + (Mathf.RoundToInt(Random.value * 192) + 1).ToString();
    }

    public MapInfo(int sizeX, int sizeY, string hindernis, string tile, string character, string ziel, int startPosX, int startPosY, int endPosX, int endPosY){
        this.size = (sizeX, sizeY);
        this.hindernis = hindernis;
        this.bodenplatte = tile;
        this.character = character;
        this.ziel = ziel;
        this.startPos = (startPosX, startPosY);
        this.endPos = (endPosX, endPosY);
    }

    public MapInfo(string json)
    {
        var jMap = JObject.Parse(json);

        this.size.x         = System.Int32.Parse(jMap["size"]["x"].ToString());
        this.size.y         = System.Int32.Parse(jMap["size"]["y"].ToString());
        this.hindernis      = jMap["barrier"].ToString();
        this.bodenplatte    = jMap["tile"].ToString();
        this.character      = jMap["character"].ToString();
        this.ziel           = jMap["target"].ToString();
        this.startPos.x     = System.Int32.Parse(jMap["startPos"]["x"].ToString());
        this.startPos.y     = System.Int32.Parse(jMap["startPos"]["y"].ToString());
        this.endPos.x       = System.Int32.Parse(jMap["endPos"]["x"].ToString());
        this.endPos.y       = System.Int32.Parse(jMap["endPos"]["y"].ToString());

        hindernisse = new bool[size.x][];
        for(int x = 0; x < this.size.x; x++)
        {
            hindernisse[x] = new bool[size.y];
            for(int y = 0; y < this.size.y; y++)
            {
                foreach (var item in jMap["obstacles"])
                {
                    if(System.Int32.Parse(item["x"].ToString()) == x && System.Int32.Parse(item["y"].ToString()) == y)
                    {
                        //Debug.Log("Add True");
                        hindernisse[x][y] = true;
                        break;
                    }
                    else 
                    {
                        //Debug.Log("Add False");
                        hindernisse[x][y] = false;
                    }
                }                 
            }
        }
    }

    // Returns true when playable
    public bool checkMap()
    {
        //Check Start and Target
        if(hindernisse[startPos.x][startPos.y])
        {
            return false;
        }
        if (hindernisse[endPos.x][endPos.y])
        {
            return false;
        }

        //Begin BFS
        bool[][] visited = new bool[size.x][];
        List<(int x, int y)> queue = new List<(int x, int y)>();
        (int x, int y) currentPosition = startPos;
        for(int x = 0; x < size.x; x++)
        {
            visited[x] = new bool[size.y];
        }
        visited[currentPosition.x][currentPosition.y] = true;
        do
        {
            if (isWalkable((currentPosition.x + 1, currentPosition.y), visited))
            {
                visited[currentPosition.x + 1][currentPosition.y] = true;
                queue.Add((currentPosition.x + 1, currentPosition.y));
            }
            if (isWalkable((currentPosition.x - 1, currentPosition.y), visited))
            {
                visited[currentPosition.x - 1][currentPosition.y] = true;
                queue.Add((currentPosition.x - 1, currentPosition.y));
            }
            if (isWalkable((currentPosition.x, currentPosition.y + 1), visited))
            {
                visited[currentPosition.x][currentPosition.y + 1] = true;
                queue.Add((currentPosition.x, currentPosition.y + 1));
            }
            if (isWalkable((currentPosition.x, currentPosition.y - 1), visited))
            {
                visited[currentPosition.x][currentPosition.y - 1] = true;
                queue.Add((currentPosition.x, currentPosition.y - 1));
            }
            if (queue.Count == 0)
            {
                return false;
            }
            currentPosition = queue[0];
            queue.RemoveAt(0);

        }
        while
        (
            currentPosition != endPos
        );

        return true;

        /*/ Check target Direction
        (int x, int y) curPos = map.startPos;
        List<(int x, int y)> checkedPos = new List<(int x, int y)>();
        List<MapPath> neighbours = MapInfo.neighbours(map.startPos, map, checkedPos);
        if(neighbours.Count == 0)
        {
            return false;
        }
        int count = 0;
        while (true)
        {
            Debug.Log("Still Tryin " + count);
            if(count > 2000)
            {
                return false;
            }
            count++;
            if (curPos == map.endPos)
            {
                return true;
            }
            if (neighbours.Count <= 0)
            {
                return false;
            }

            (int x, int y) nextPos = nearestPos(neighbours);
            var newNeighbours = MapInfo.neighbours(nextPos, map, checkedPos);
            foreach (var newNeighbour in newNeighbours)
            {
                neighbours.Add(newNeighbour);
            }
            curPos = nextPos;
        }*/
    }

    public static (int x, int y) nearestPos(List<MapPath> path)
    {
        MapPath nearest;
        nearest = path[0];
        for (int i = 0; i < path.Count; i++)
        {
            if (path[i].distance < nearest.distance)
            {
                nearest = path[i];
            }
        }
        path.Remove(nearest);
        return nearest.position;
    }

    /*public static List<MapPath> neighbours((int x, int y) pos, MapInfo map, List<(int x, int y)> checkedPos)
    {
        List<MapPath> neighbours = new List<MapPath>();
        if (isWalkable((pos.x + 1, pos.y), map, checkedPos))
        {
            neighbours.Add(new MapPath(calcDistanz((pos.x + 1, pos.y), map.endPos), (pos.x + 1, pos.y)));
        }
        if (isWalkable((pos.x - 1, pos.y), map, checkedPos))
        {
            neighbours.Add(new MapPath(calcDistanz((pos.x - 1, pos.y), map.endPos), (pos.x - 1, pos.y)));
        }
        if (isWalkable((pos.x, pos.y + 1), map, checkedPos))
        {
            neighbours.Add(new MapPath(calcDistanz((pos.x, pos.y + 1), map.endPos), (pos.x, pos.y + 1)));
        }
        if (isWalkable((pos.x, pos.y - 1), map, checkedPos))
        {
            neighbours.Add(new MapPath(calcDistanz((pos.x, pos.y - 1), map.endPos), (pos.x, pos.y - 1)));
        }
        return neighbours;
    }
    */
    public bool isWalkable((int x, int y) pos, bool[][] visited)
    {
        if (pos.x > (size.x - 1) || pos.x < 0)
        {
            return false;
        }

        if (pos.y > (size.y - 1) || pos.y < 0)
        {
            return false;
        }
        if (visited[pos.x][pos.y])
        {
            return false;
        }
        if (hindernisse[pos.x][pos.y])
        {
            return false;
        }
        return true;
    }

    private static int calcDistanz ((int x, int y) a, (int x, int y) b)
    {
        return Mathf.RoundToInt(Mathf.Abs(b.x - a.x) + Mathf.Abs(b.y - a.y));
    }
}

public class MapPath
{
    public int distance;
    public (int x, int y) position;
    public MapPath(int distance, (int x, int y) position)
    {
        this.distance = distance;
        this.position = position;
    }

    public static MapPath operator <(MapPath a, MapPath b)
    {
        if (a.distance < b.distance)
        {
            return a;
        }
        else
        {
            return b;
        }
    }

    public static MapPath operator >(MapPath a, MapPath b)
    {
        if (a.distance > b.distance)
        {
            return a;
        }
        else
        {
            return b;
        }
    }

}