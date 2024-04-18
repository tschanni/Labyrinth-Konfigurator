using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Tileinfo
{
    public bool walkable;
    public int x;
    public int y;
    public bool ziel;

    public Tileinfo(bool walkable, int x, int y, bool ziel)
    {
        this.walkable = walkable;
        this.x = x;
        this.y = y;
        this.ziel = ziel;
    }
}
