/**
 * Comportamiento que sigue derecho en x al target
 * 
 * @param {type} game
 * @param {type} posx
 * @param {type} posy
 * @param {type} key
 * @param {type} frame
 * @param {type} target
 * @returns {Behavior_Derecho}
 */
function Behavior_Mouse(game, posx, posy, key, frame, target) {
    Behavior.call(this, game, posx, posy, key, frame, target);
        
    
    
    return this;
}
Behavior_Mouse.prototype = Object.create(Behavior.prototype);//Defino que es sub clase de Sprite.
Behavior_Mouse.prototype.constructor = Behavior_Mouse;

Behavior_Mouse.prototype.update = function () {
        
    // Sigue al mouse y rota siempre y cuando este a 15 pixeles(?) de distancia
    if (game.physics.arcade.distanceToPointer(this.sprite, game.input.activePointer) > 5)
    {
        // Movimiento
        game.physics.arcade.moveToPointer(this.sprite, 100);

        // Rotación siguiendo al mouse
        var targetAngle = (360 / (2 * Math.PI)) * game.math.angleBetween(this.sprite.body.x, this.sprite.body.y,this.game.input.activePointer.x, this.game.input.activePointer.y) + 90;
        if(targetAngle < 0){                    
            targetAngle += 360;
        }               
        this.sprite.angle = targetAngle; 

    }
    else
    {
        // Sino se queda quieto
        this.sprite.body.velocity.set(0);
    }                              

};