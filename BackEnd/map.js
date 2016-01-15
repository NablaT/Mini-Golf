/**
 *
 * Manage the hole
 *
 * Created by Romain Guillot & Guillaume Rahbari on 15/01/16.
 */

var NB_ROW = 800;
var NB_COL = 1200;

var RAYON_HOLE = 50; // in px

var matrice = []; // lignes = Y, colonnes = X
var pos_dep = [400, 100];
var pos_hole = [400, 1100];
var pos_ball = pos_dep;

var CENTIMETRE_TO_PIXELS = 2; // TODO fake to define

var create = function(){

    // create white matrix
    for (var i=0; i<NB_ROW; i++){
        matrice[i] = [];
        for (var j=0; j<NB_COL; j++){
            matrice[i][j] = 0;
        }
    }

    // TODO place the obstacles
    create_obstacles();

    console.log('Map créée');
};

var create_obstacles = function(){
};

var deplace_ball = function (dist, angle){

    var distInPixels = dist * CENTIMETRE_TO_PIXELS;

    // current position of the ball
    var posX = pos_ball[1];
    var posY = pos_ball[0];

    // calculate the deplacement
    var deplacementX = Math.round(Math.cos(angle* Math.PI/180) * distInPixels); // A = cos a * hyp
    var deplacementY = Math.round(Math.sin(angle* Math.PI/180) * distInPixels); // B = sin a * hyp

    // le Y n'est pas bon

    // position final of the ball
    pos_ball = [posY + deplacementY, posX + deplacementX];

    // TODO send the new position of the ball to the frontend
    console.log('Nouvelle position de la balle ' + pos_ball);

    if (checkIsInHole()){

        // the ball is in the hole
        console.log("You WIN !!");

        // TODO send event to scores frontend

    } else {

        // play again
    }
};

var checkIsInHole = function (){

    // check if the ball is in a rayon around the hole
    for (var i=pos_hole[0]-RAYON_HOLE; i<=pos_hole[0]+RAYON_HOLE; i++){
        for (var j=pos_hole[1]-RAYON_HOLE; j<=pos_hole[1]+RAYON_HOLE; j++){
            if (pos_ball == [i, j]){
                return true;
            }
        }
    }
    return false;
};

module.exports = {create:create, deplace_ball:deplace_ball};


