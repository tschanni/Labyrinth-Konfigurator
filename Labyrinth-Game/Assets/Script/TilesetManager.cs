using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.U2D;


public class TilesetManager : MonoBehaviour
{
    [SerializeField]
    public GameObject Bodenplatten;
    [SerializeField]
    public GameObject Hindernisse;
    [SerializeField]
    public GameObject Ziel;
    [SerializeField]
    public GameObject Character;

    private List<GameObject> spawnedGameObjects;

    // Start is called before the first frame update
    void Start()
    {
        spawnedGameObjects = new List<GameObject>();
    }

    void EraseMap()
    {
        foreach (GameObject obj in spawnedGameObjects)
        {
            GameObject.Destroy(obj);
        }
    }
    public void DrawMap(MapInfo Map)
    {
        EraseMap();
        Debug.Log("DrawMap");

        GameObject bodenplatte = null;
        GameObject hinderniss = null;
        GameObject ziel = null;
        GameObject player = null;

        // Choose bodenplatte
        bodenplatte = Bodenplatten;
        //bodenplatte.GetComponent<SpriteRenderer>().sprite = ResourceManager.GetSprite("Bodenplatten", "Bodenplatte " + Map.bodenplatte);
        bodenplatte.GetComponent<SpriteRenderer>().sprite = ResourceManager.GetSprite("Bodenplatten", Map.bodenplatte.Split('.')[0]);

        // Choose hinderniss
        hinderniss = Hindernisse;
        //hinderniss.GetComponent<SpriteRenderer>().sprite = ResourceManager.GetSprite("Hindernisse", "Hindernis " + Map.hindernis);
        hinderniss.GetComponent<SpriteRenderer>().sprite = ResourceManager.GetSprite("Hindernisse", Map.hindernis.Split('.')[0]);

        // Choose ziel
        ziel = Ziel;
        //ziel.GetComponent<SpriteRenderer>().sprite = ResourceManager.GetSprite("Ziel", "Ziel " + Map.ziel);
        ziel.GetComponent<SpriteRenderer>().sprite = ResourceManager.GetSprite("Ziel", Map.ziel.Split('.')[0]);


        // Choose player
        player = Character;
        //player.GetComponent<CharacterController>().characterName = Map.character;
        player.GetComponent<CharacterController>().characterName = Map.character.Split('_')[0];

        // Draw Map
        // Spawn Tiles
        for (int x = 0; x < Map.size.x; x++)
        {
            for (int y = 0; y < Map.size.y; y++)
            {
                SpawnGameObject(bodenplatte, x, y);
            }
        }

        // Spawn MapRand
        for (int x = -1; x < Map.size.x + 1; x++)
        {
            SpawnGameObject(hinderniss, x, -1);
            SpawnGameObject(hinderniss, x, Mathf.RoundToInt(Map.size.y));
        }
        for (int y = -1; y < Map.size.y + 1; y++)
        {
            SpawnGameObject(hinderniss, -1, y);
            SpawnGameObject(hinderniss, Mathf.RoundToInt(Map.size.x), y);
        }

        // Spawn Objects
        for (int x = 0; x < Map.size.x; x++)
        {
            for (int y = 0; y < Map.size.y; y++)
            {
                if(Map.hindernisse[x][y])
                {
                    SpawnGameObject(hinderniss, x, y);

                }
            }
        }
        
        /*foreach (var item in Map.hindernisse)
        {
            SpawnGameObject(hinderniss, Mathf.RoundToInt(item.x), Mathf.RoundToInt(item.y));
        }*/


        GameObject character = SpawnGameObject(player, Mathf.RoundToInt(Map.startPos.x), Mathf.RoundToInt(Map.startPos.y));
        GameManager.instance.characterController = character.GetComponent<CharacterController>();
        // Spawn Targets
        SpawnGameObject(ziel, Mathf.RoundToInt(Map.endPos.x), Mathf.RoundToInt(Map.endPos.y));

        // Init Camera Position
        initCameraPosition(Map.size);

        GameManager.instance.StartTimer();
    }

    private GameObject SpawnGameObject(GameObject obj, int x, int y)
    {
        Vector2 pos = new Vector2(x * 0.32f, y * 0.32f);
        GameObject NewObject = GameObject.Instantiate(obj);
        NewObject.transform.position = pos;
        spawnedGameObjects.Add(NewObject);
        return NewObject;
    }

    private void initCameraPosition((int x, int y) size)
    {
        float xpos = (size.x * 0.32f - 0.32f) / 2;
        float ypos = (size.y * 0.32f - 0.32f) / 2;

        Camera.main.transform.position = new Vector3(xpos, ypos, -10);
        Camera.main.orthographicSize = size.x * 0.32f / 2 * Camera.main.pixelHeight / Camera.main.pixelWidth;
        //Camera.main.gameObject.GetComponent<PixelPerfectCamera>().refResolutionX = Mathf.RoundToInt(Map.mapDimensions.x * 32);
        //Camera.main.gameObject.GetComponent<PixelPerfectCamera>().refResolutionY = Mathf.RoundToInt(Map.mapDimensions.y * 32);

    }

    private void OnRectTransformDimensionsChange()
    {
        initCameraPosition(GameManager.instance.map.size);
    }
}



