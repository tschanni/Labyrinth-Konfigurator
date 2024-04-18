using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class GameManager : MonoBehaviour
{
    public TextMeshProUGUI timerText;

    public TextMeshProUGUI gameOverText;

    public float timer;

    private bool timerRunning;

    public string jsonMap;

    public MapInfo map;

    public TilesetManager tm;
    public bool random = false;

    public static GameManager instance;

    public CharacterController characterController;

    public GameObject Steuerkreuz;

    // Start is called before the first frame update
    void Start()
    {  

        instance = this;

        tm = GetComponent<TilesetManager>();
        Debug.Log("Done Loading Game");
        Application.ExternalCall("UnityLoaded");
        #if UNITY_EDITOR
        StartRandomGame();
        #endif
    }

    void StartRandomGame(){
        random = true;
        timerText.gameObject.SetActive(false);
        GenerateMap();
    }

    // Update is called once per frame
    void Update()
    {
        if(timerRunning)
        {
            timer += Time.deltaTime;
            timerText.SetText(timer.ToString("0.0") + " s");
        }
    }

    [ContextMenu("Load Map")]
    public void GenerateMap()
    {
        StartCoroutine("GenerateMapp");
        //tm.DrawMap(map);
    }

    public IEnumerator GenerateMapp()
    {
        map = new MapInfo((16,9));
        while(!map.checkMap())
        {
            map = new MapInfo((16,9));
            //Debug.LogError("SkipMap");
            //yield return new WaitForEndOfFrame();
        }
        tm.DrawMap(map);
        yield return new WaitForEndOfFrame();
    }


    [ContextMenu("Load Map")]
    public void LoadMap(string jsonMap)
    {
        //jsonMap = "{\"size\":{\"x\":16,\"y\":9},\"tile\":\"1\",\"barrier\":\"1\",\"character\":\"1\",\"target\":\"1\",\"obstacles\":[{\"x\":0,\"y\":2},{\"x\":1,\"y\":2},{\"x\":2,\"y\":2}],\"startPos\":{\"x\":0,\"y\":0},\"endPos\":{\"x\":0,\"y\":8}}";

        //EndTimer();

        map = new MapInfo(jsonMap);
        tm.DrawMap(map);

    }

    public void ShowTouchUI()
    {
        Steuerkreuz.SetActive(true);
    }

    public void Replay()
    {
        tm.DrawMap(map);
        gameOverText.gameObject.transform.parent.gameObject.SetActive(false);
    }
    

    private class GameMapData {
        public string size;
        public string tile;
        public string barrier;
        public string character;
        public string target;
        public string[] obstacles;
        public string startPos;
        public string endPos;

    }

    private class Vector {
        public int x;
        public int y;
    }

    public void ImportData(string data)
    {
        timerRunning = false;
        timerText.SetText(data);
    }

    public void StartTimer()
    {
        timer = 0;
        timerRunning = true;
    }

    public void EndTimer()
    {
        timerRunning = false;
        Debug.Log("Time: " + timer + "ms");
        
        if(!random)
        {
            gameOverText.gameObject.transform.parent.gameObject.SetActive(true);
            gameOverText.SetText("Well Done \nYour Score: \n" + (timer*100).ToString("0"));
            Application.ExternalCall("UnityAddHighscore", (timer*100));
        }

        if(random)
            GenerateMap();
    }
}