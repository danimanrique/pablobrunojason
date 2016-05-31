/**
 * Comportamiento para uso del cursor
 * 
 * @param {type} game
 * @param {type} posx
 * @param {type} posy
 * @param {type} key
 * @param {type} frame
 * @param {type} target
 * @param {type} cursors
 * @returns {Behavior_Cursor}
 */
function Behavior_Cursor(game, posx, posy, key, frame,target,cursors){
    Behavior.call(this,game, posx, posy, key, frame,target);
    
    //this.sprite.body.bounce.y = 0.2;
  //  this.sprite.body.gravity.y = 300;
    this.sprite.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
    this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
    
    
    this.cursors=cursors;
    return this;
}
Behavior_Cursor.prototype= Object.create(Behavior.prototype);//Degfino que es sub clase de Sprite.
Behavior_Cursor.prototype.constructor=Behavior_Cursor;

Behavior_Cursor.prototype.update=function(){

     this.sprite.body.velocity.x = 0;
     this.sprite.body.velocity.y = 0;

    if (this.cursors.left.isDown)
    {
        //  Move to the left
        this.sprite.body.velocity.x = -200;

        //this.sprite.animations.play('left');
    }
    else if (this.cursors.right.isDown)
    {
        //  Move to the right
        this.sprite.body.velocity.x = 200;

        //this.sprite.animations.play('right');
    }
    else
    {
        //  Stand still
        this.sprite.animations.stop();

        this.frame = 4;
    }
    if (this.cursors.up.isDown)
    {
        //  Move to the left
        this.sprite.body.velocity.y = -200;

        //this.sprite.animations.play('left');
    }
    else if (this.cursors.down.isDown)
    {
        //  Move to the right
        this.sprite.body.velocity.y = 200;

        //this.sprite.animations.play('right');
    }

    //  Allow the this to jump if they are touching the ground.
    if (this.cursors.up.isDown && this.sprite.body.touching.down)
    {
        this.sprite.body.velocity.y = -350;
    }
        
        
    }
;