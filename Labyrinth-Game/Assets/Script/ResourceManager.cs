using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[System.Serializable]
public static class ResourceManager 
{
    public static Sprite GetSprite(string type, string filename)
    {     
        //Debug.Log("Load Sprite"+ type + "/" + filename);
        return Resources.Load<Sprite>(type + "/" + filename);
    }

    public static CharacterAnimation GetCharacterAnimation(string characterName)
    {
        return new CharacterAnimation(
            GetAnimation(characterName + "_idle_down"),
            GetAnimation(characterName + "_idle_up"),
            GetAnimation(characterName + "_idle_right"),
            GetAnimation(characterName + "_walk_down"),
            GetAnimation(characterName + "_walk_up"),
            GetAnimation(characterName + "_walk_right")
        );        
    }

    public static Sprite[] GetAnimation(string animationName)
    {
        //Debug.Log("GetAnimation: " + animationName);

        List<Sprite> animation = new List<Sprite>();
        for(int i = 0; i < 10; i++)
        {
            Sprite newSprite = GetSprite("Charaktere", animationName + "_" + i);
            //Debug.Log("GetAnimationSprite: " + animationName + "_" + i);

            if(newSprite == null)
                break;
            animation.Add(newSprite);
        }
        return animation.ToArray();
    }

    [System.Serializable]
    public class CharacterAnimation
    {
        public Sprite[] idle_down;
        public Sprite[] idle_up;
        public Sprite[] idle_right;

        public Sprite[] walk_down;
        public Sprite[] walk_up;
        public Sprite[] walk_right;

        public CharacterAnimation(Sprite[] idle_down, Sprite[] idle_up, Sprite[] idle_right, Sprite[] walk_down, Sprite[] walk_up, Sprite[] walk_right)
        {
            this.idle_down = idle_down;
            this.idle_up = idle_up;
            this.idle_right = idle_right;

            this.walk_down = walk_down;
            this.walk_up = walk_up;
            this.walk_right = walk_right;
        }

    }
}