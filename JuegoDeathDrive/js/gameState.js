/**
 * Created by pablo-user on 02/04/16.
 */

var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'divGame', {preload: preload, create: create, update: update});

function preload() {

    game.load.tilemap('level', 'assets/nivelFinal.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.image('patron1', 'assets/patron05.jpg');
    game.load.image('patron2', 'assets/patron06.jpg');

    game.load.image('blueL', 'assets/blueLight.png');
    game.load.image('redL', 'assets/redLight.png');

    game.load.image('tarima', 'assets/tarimaNave.png');
    game.load.image('soporte', 'assets/soporteTarima.png');
    game.load.image('plataforma', 'assets/plataformaComienzo.png');

    game.load.spritesheet('nave', 'assets/nave.png', 141.66, 64.5, 6);
    game.load.spritesheet('explosion', 'assets/interiorPortal2.png', 160, 160, 16);
    game.load.spritesheet('personaje', 'assets/personajeMovimientos.png', 62, 70, 24);
    //   game.load.spritesheet('lluvia','assets/lluviaMeteoro.png',192,192,35);
//game.load.spritesheet('bala','assets/bullets.png',63,51);
    game.load.image('portal', 'assets/portal.png');
    game.load.image('stars', 'assets/stars.jpg');

}

var bulletTime = 0;
var lluvia;
var aCaer;
var map;
var layer;
var nave;
var cursors;
var portal;
var enemigo;
var spaceBar;
var miradaNave;
var estadoJugador;
var explosion;
var miradaJugador
var personaje, vidaJugador, bullets;
var teclaD, teclaA, teclaE;
var objetivo;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 3008, 1504);
    game.add.sprite(0, 0, 'stars');


    map = game.add.tilemap('level');
    map.addTilesetImage('patron05', 'patron1');
    map.addTilesetImage('patron06', 'patron2');
    map.addTilesetImage('blueLight', 'blueL');
    map.addTilesetImage('redLight', 'redL');
    map.addTilesetImage('tarimaNave', 'tarima');
    map.addTilesetImage('soporteTarima', 'soporte');
    map.addTilesetImage('plataformaComienzo', 'plataforma');

    map.setCollisionBetween(1, 30, true); //barrita azul

    map.setCollisionBetween(31, 766, true);//patron06

    map.setCollisionBetween(816, 1800, true);
    layer = map.createLayer(0);

    nave = game.add.sprite(50, 650, 'nave');
    game.physics.enable(nave, Phaser.Physics.ARCADE);
    nave.body.collideWorldBounds = true;
    nave.body.allowGravity = false;

    portal = game.add.sprite(2600, 1050, 'portal');
    portal.scale.setTo(0.6, 0.6);
    game.physics.enable(portal, Phaser.Physics.ARCADE);
    portal.body.immovable = true;
    portal.body.collideWorldBounds = true;
    portal.body.allowGravity = false;

    explosion = game.add.sprite(2620, 1060, 'explosion');
    explosion.scale.setTo(2, 2);
    explosion.animations.add('animar', [3, 4, 5, 6, 7, 8, 9, 10], true);
    game.physics.enable(explosion, Phaser.Physics.ARCADE);
    explosion.body.immovable = true;
    explosion.body.collideWorldBounds = true;


    //objetivo = new Behavior_Mouse(game, 1000, 1180, 'personaje', 3, null);
    personaje = new Behavior_Cursor(game,10,1180,'personaje',3,null)
    //personaje = game.add.sprite(10, 1180, 'personaje');
    personaje.sprite.animations.add('runLeft', [7, 6, 5, 4, 3, 2, 1, 0]);
    personaje.sprite.animations.add('runRight', [8, 9, 10, 11, 12, 13, 14, 15]);
    game.physics.enable(personaje.sprite, Phaser.Physics.ARCADE);
    personaje.sprite.body.collideWorldBounds = true;
    objetivo = new Behavior_Seek(game, 10 ,1180, 'personaje', 3 ,personaje);
    objetivo.sprite.body.collideWorldBounds = true;
    game.physics.enable(objetivo.sprite, Phaser.Physics.ARCADE);

//
    // game.time.events.repeat(Phaser.Timer.SECOND, 20, resurrect, this);

    /* lluvia=game.add.group();
     for (var i = 0; i < 150; i++)
     {
    
     lluvia.create(devolverNumeroAleatorio(10,3000),-5, 'lluvia');
     }*/


    //game.physics.enable(lluvia,Phaser.Physics.ARCADE);
    // lluvia.callAll('animations.add', 'animations', 'caer',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);

    //  And play them
    //  lluvia.callAll('animations.play', 'animations', 'caer',15,false);
    //  lluvia.callAll('animations.add', 'animations', 'colision',[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34]);
    //lluvia.callAll('animations.play', 'animations', 'colision',10,false);
    
    game.physics.enable(personaje.sprite, Phaser.Physics.ARCADE);
    game.physics.enable(objetivo.sprite, Phaser.Physics.ARCADE);

    miradaNave = 'right';
    miradaJugador = 'right';

    estadoJugador = true;
    game.camera.follow(personaje.sprite,Phaser.Camera.FOLLOW_TOPDOWN);

    cursors = game.input.keyboard.createCursorKeys();
    spaceBar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    teclaD = game.input.keyboard.addKey(Phaser.KeyCode.D);
    teclaA = game.input.keyboard.addKey(Phaser.KeyCode.A);
    teclaE = game.input.keyboard.addKey(Phaser.KeyCode.E);
}

function update() {


    game.physics.arcade.collide(nave, layer);
    game.physics.arcade.collide(personaje.sprite, layer);
    game.physics.arcade.collide(objetivo.sprite, layer);

    game.physics.arcade.overlap(personaje.sprite, explosion, entrarPortal, null, this);
    game.physics.arcade.overlap(personaje.sprite, portal, activarPortal, null, this);

    game.physics.arcade.overlap(personaje.sprite, nave, changeState, null, this);
    // game.physics.arcade.overlap(lluvia,layer,'colisionarLluvia',null,this);
    
    game.physics.arcade.overlap(objetivo.sprite, explosion, entrarPortal, null, this);
    game.physics.arcade.overlap(objetivo.sprite, portal, activarPortal, null, this);

    game.physics.arcade.overlap(objetivo.sprite, nave, changeState, null, this);

    personaje.sprite.body.velocity.x = 0;
    personaje.sprite.body.velocity.y = 0;
    nave.body.velocity.x = 0;
    nave.body.velocity.y = 0;


    if (estadoJugador) {
        controlJugador();
    } else {
        controlNave();
    }
    objetivo.update();
    //personaje.update();

}

function controlNave() {
    //Arriba y abajo
    if (cursors.up.isDown)
        nave.body.velocity.y = -800;
    else if (cursors.down.isDown)
        nave.body.velocity.y = 800;

    //Izquierda y Derecha

    if (cursors.left.isDown) {
        nave.body.velocity.x = -800;
        if (miradaNave !== 'left') {
            nave.frame = 3;
            miradaNave = 'left';
        }

    } else if (cursors.right.isDown) {
        nave.body.velocity.x = 800;

        if (miradaNave !== 'right') {
            //nave.animations.play('volarAdelante', 10, true);
            nave.frame = 0;
            miradaNave = 'right';
        }

    }


}

function controlJugador() {

    if (teclaD.isDown) {
        if (miradaJugador == 'left') {
            // personaje.animations.play('dispararLeft', 2, true);
            personaje.sprite.frame = 22;
            //   fireBullet();
        } else
        //personaje.animations.play('dispararRight', 2, true);
            personaje.sprite.frame = 17;
        // fireBullet();
    } else {

        if (cursors.up.isDown) {
            personaje.sprite.body.velocity.y = -400;
            //personaje.animations.stop();
        }
        else if (cursors.down.isDown) {
            personaje.sprite.body.velocity.y = 400;
            //personaje.animations.stop();
        } //else {
        if (cursors.left.isDown) {
            personaje.sprite.body.velocity.x = -400;
            if (miradaJugador != 'left') {
                // personaje.animation.stop();
                personaje.sprite.animations.play('runLeft', 8, true);
                miradaJugador = 'left';
            } else personaje.sprite.animations.play('runLeft', 8, true);
        } else if (cursors.right.isDown) {
            personaje.sprite.body.velocity.x = 400;
            if (miradaJugador != 'right') {
                //  personaje.animation.stop();
                personaje.sprite.animations.play('runRight', 8, true);
                miradaJugador = 'right';
            } else   personaje.sprite.animations.play('runRight', 8, true);

        } else {
            if (miradaJugador == 'left') {
                personaje.sprite.frame = 23;
            } else personaje.sprite.frame = 16;
            //personaje.animations.stop();
        }
        //}
    }
}


function changeState() {
    if (teclaE.isDown) {
        if (estadoJugador)
            estadoJugador = false;
        personaje.visible = false;
        game.camera.follow(nave);
    }


    // else {
    //   estadoJugador=true;game.camera.follow(player);}

}

function entrarPortal() {
    if (spaceBar.isDown && explosion.visible) {
        personaje.x = 50;
        personaje.y = 650;
    }

}

function activarPortal() {
    if (teclaA.isDown) {

        explosion.animations.play('animar', 15, true);

    }
}
function devolverNumeroAleatorio(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function caeLluvia() {
    lluvia.callAll('animations.play', 'animations', 'caer', 15, false);

}

function colisionarLluvia() {
    lluvia.callAll('animations.play', 'animations', 'colision', 15, false);

}
