using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[System.Serializable]
public class CharacterAnimator
{
    public SpriteRenderer renderer;
    public ResourceManager.CharacterAnimation animation;
    private int currentSprite;
    private Vector2 currentDirection = Vector2.down;
    private float animationTimer;
    public CharacterAnimator(ResourceManager.CharacterAnimation animation, SpriteRenderer renderer)
    {
        this.animation = animation; 
        this.renderer = renderer;
    }
    public void Animate(Vector2 direction, bool walking)
    {
        //Debug.Log("CurrentFrame" + currentSprite);

        animationTimer += Time.deltaTime;
        if(direction != currentDirection && walking)
        {
            animationTimer = 0;
            currentSprite = 0;
            currentDirection = direction;
            SetFrame(currentSprite, currentDirection, walking);
        }            
        else if(animationTimer > 0.17f)
        {
            animationTimer = 0;
            SetNextFrame(currentDirection, walking);
        }
    }

    public void SetNextFrame(Vector2 direction, bool walking)
    {        
        if(walking)
        {
            if(direction == Vector2.down)
            {
                if(++currentSprite >= animation.walk_down.Length)
                {
                    currentSprite = 0;
                }
            }
            else if(direction == Vector2.up)
            {
                if(++currentSprite >= animation.walk_up.Length)
                {
                    currentSprite = 0;
                }
            }
            else if(direction == Vector2.right)
            {
                if(++currentSprite >= animation.walk_right.Length)
                {
                    currentSprite = 0;
                }
            }
            else if(direction == Vector2.left)
            {
                if(++currentSprite >= animation.walk_right.Length)
                {
                    currentSprite = 0;
                }
            }
        }
        else
        {
            if(direction == Vector2.down)
            {
                if(++currentSprite >= animation.idle_down.Length)
                {
                    currentSprite = 0;
                }
            }
            else if(direction == Vector2.up)
            {
                if(++currentSprite >= animation.idle_up.Length)
                {
                    currentSprite = 0;
                }
            }
            else if(direction == Vector2.right)
            {
                if(++currentSprite >= animation.idle_right.Length)
                {
                    currentSprite = 0;
                }
            }
            else if(direction == Vector2.left)
            {
                if(++currentSprite >= animation.idle_right.Length)
                {
                    currentSprite = 0;
                }
            }
        }
        SetFrame(currentSprite, direction, walking);
    }

    public void SetFrame(int frame, Vector2 direction, bool walking)
    {
        Sprite newSprite = null;
        renderer.flipX = false;
        if(walking)
        {
            if(direction == Vector2.down)
            {
                newSprite = animation.walk_down[frame];
            }
            else if(direction == Vector2.up)
            {
                newSprite = animation.walk_up[frame];
            }
            else if(direction == Vector2.right)
            {
                newSprite = animation.walk_right[frame];
            }
            else if(direction == Vector2.left)
            {
                newSprite = animation.walk_right[frame];
                renderer.flipX = true;
            }
        }
        else
        {
            if(direction == Vector2.down)
            {
                newSprite = animation.idle_down[frame];
            }
            else if(direction == Vector2.up)
            {
                newSprite = animation.idle_up[frame];
            }
            else if(direction == Vector2.right)
            {
                newSprite = animation.idle_right[frame];
            }
            else if(direction == Vector2.left)
            {
                newSprite = animation.idle_right[frame];
                renderer.flipX = true;
            }
        }
        renderer.sprite = newSprite;
    }
}