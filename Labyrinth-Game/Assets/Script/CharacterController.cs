using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CharacterController : MonoBehaviour
{
    [SerializeField]
    private float speed;
    private Rigidbody2D rigidbody;
    public string characterName;

    public Vector2 touchInput;

    [SerializeField]
    private CharacterAnimator animator;
    

    // Start is called before the first frame update
    void Start()
    {
        rigidbody = GetComponent<Rigidbody2D>();
        animator = new CharacterAnimator(ResourceManager.GetCharacterAnimation(characterName), GetComponent<SpriteRenderer>());
    }

    // Update is called once per frame
    void Update()
    {
        Vector2 force = new Vector2(Input.GetAxis("Horizontal"), Input.GetAxis("Vertical"));
        force = force + touchInput;
        if (force.x * force.x > force.y * force.y)
        {
            force.y = 0;
        }
        else
        {
            force.x = 0;
        }
        force.Normalize();

        if (force.magnitude > 0)
        {
            Walk(force);
        }
        else
        {
            animator.Animate(Vector2.zero, false);
        }
    }

    private void Walk(Vector2 force)
    {
        rigidbody.MovePosition(rigidbody.position + speed * force * Time.fixedDeltaTime);
        animator.Animate(force, true);
    }
}


