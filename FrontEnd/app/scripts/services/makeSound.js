'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.frontEndApp
 * @description
 * # player
 * Factory in the frontEndApp.
 */
angular.module('frontEndApp')
  .factory('makeSound', function () {
    var audio;

    return {

      /**
       * Function getSong. This functions returns the song
       * @returns {*}
       */
      getSong: function () {
        return audio;
      },

      /**
       * Function setNbPlayer. This function sets the song
       * @param number
       */
      setSong: function(pathSong){
        console.log("in setsong: path; ", pathSong);
        audio=new Audio(pathSong);
      },

      /**
       * FUnction play. THis function plays the song
       */

      playSong: function(){
        console.log("in playSong ");
        audio.addEventListener('ended', function() {
          this.currentTime = 0;
          this.playSong();
        }, false);
        audio.play();

      },

      stopSong:function(){
        //audio.stop();
      }
    };
  });
