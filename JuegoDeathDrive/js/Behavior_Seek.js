/**
 * Comportamiento que sigue Seek en x al target
 * 
 * @param {type} game
 * @param {type} posx
 * @param {type} posy
 * @param {type} key
 * @param {type} frame
 * @param {type} target
 * @returns {Behavior_Seek}
 */
function Behavior_Seek(game, posx, posy, key, frame, target) {
    Behavior.call(this, game, posx, posy, key, frame, target);
        
  //  this.sprite.body.bounce.y = 0.2;
  //  this.sprite.body.gravity.y = 300;
    this.sprite.body.collideWorldBounds = true;
    this.vecReference = new Phaser.Point(0, 0);

this.sentido=1;
  //  this.esp_speed = 0;
    this.max_speed = 300;
    this.max_force=4;
  //  this.min_speed = 0;
  //  this.min_distance = 0;
 //   this.max_distance = 0;

    return this;
}
Behavior_Seek.prototype = Object.create(Behavior.prototype);//Degfino que es sub clase de Sprite.
Behavior_Seek.prototype.constructor = Behavior_Seek;

Behavior_Seek.prototype.update = function () {

    this.seek();
};

Behavior_Seek.prototype.seek=function(){
    //Obtengo la desired velocity

    var vectorDesired;
    vectorDesired = this.calcularDesiredVelocity();

    //Obtengo el vector de fuerza
    var vectorSteeringForce;
    vectorSteeringForce = this.calcularSteeringForce(vectorDesired);

    //aplico el vector de fuerza al this.sprite

    this.aplicarVectorDeFuerza(vectorSteeringForce);

  //  this.sprite.rotation = vecReference.angle(this.sprite.body.velocity);
}

Behavior_Seek.prototype.calcularDesiredVelocity=function () {
    // Calculo el vector deseado = normalizado(POSICION TARGET - POSICION this.sprite) * maximaVelocidad

    var vectorDesired;
    vectorDesired = ((Phaser.Point.subtract(this.target.sprite.position, this.sprite.position)).normalize()).multiply(this.max_speed, this.max_speed);

    return vectorDesired;
}

Behavior_Seek.prototype.calcularSteeringForce=function(vectorDesired){

    //Calculo el vector de fueza = vector deseado - velocidad actual del this.sprite
//steering = steering / mass la masa como se calucula???

    var vectorSteeringForce;
    vectorSteeringForce = Phaser.Point.subtract(vectorDesired, this.sprite.body.velocity);

//limito la magnitud del vector, es decir la fuerza que se le va a aplicar
    if (vectorSteeringForce.getMagnitudeSq() > (this.max_force*this.max_force)){
        vectorSteeringForce.setMagnitude(this.max_force);
    }
    return vectorSteeringForce;
}

Behavior_Seek.prototype.aplicarVectorDeFuerza=function(vectorSteeringForce) {

    //Calculo la nueva velocidad y posicion del this.sprite sumando la posicion con el vector de fuerza
    this.sprite.body.velocity.add(vectorSteeringForce.x, vectorSteeringForce.y);

    //si la velocidad nueva es mayor a la maxima velocidad determinada, se deja la maxima.
    if (this.sprite.body.velocity.getMagnitudeSq() > (this.max_speed * this.max_speed)) {
        this.sprite.body.velocity.setMagnitude(this.sentido*this.max_speed);
    }
}