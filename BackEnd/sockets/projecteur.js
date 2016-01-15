/**
 * Created by guillaume on 18/12/2015.
 */

var TRANSLATE_Y = -400;
var TRANSLATE_X = -600;

var game_is_ended = function(){

};

var convertToProjectedMap = function(coordX, coordY){
    return [coordY +TRANSLATE_Y,  coordX+TRANSLATE_X];
};
