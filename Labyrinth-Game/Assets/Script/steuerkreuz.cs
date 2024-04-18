using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using UnityEngine.EventSystems;// Required when using Event data.

public class steuerkreuz : MonoBehaviour, IPointerDownHandler, IPointerUpHandler
{
    public Vector2 direction;

    //Do this when the mouse is clicked over the selectable object this script is attached to.
	public void OnPointerUp (PointerEventData eventData) 
	{
        GameManager.instance.characterController.touchInput = Vector2.zero;
		//Debug.Log (this.gameObject.name + " OnPointerUp.");
	}

    public void OnPointerDown (PointerEventData eventData) 
	{
        GameManager.instance.characterController.touchInput = direction;
		//Debug.Log (this.gameObject.name + " OnPointerUp.");
	}
}
