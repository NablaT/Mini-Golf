'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:JeuCtrl
 * @description
 * # JeuCtrl
 * Controller of the frontEndApp
 */

angular.module('frontEndApp')
  .factory("services", [ '$http', 'constants', function ( $http, constants) {

    return {

      /**
       * Cette fonction permet de récupérer la liste des scores présents en base de données.
       * Cette fonction retourne une promesse.
       *
       * @example Voici comment utiliser cette fonction :
       *  serviceCtrl.getScore().then(
       *    // Fonction callback lors du success
       *    function (data) {
       *      console.log(data);
       *    },
       *    // Fonction callback d'erreur.
       *    function (msgErreur) {
       *      console.log(msgErreur);
       *    }
       *  );
       *
       * La fonction callback de success renvoie un tableau contenant les scores:
       *  [ {
       *      id_player: 1,
       *      score_value:10
       *    }, {
       *      id_player: é,
       *      score_value:30
       *    }
       *  ]
       *
       * @returns {Function|promise} Retourne une promesse de réponse avec :
       * <ul>
       *     <li>soit un tableau de ce qu'on attend</li>
       *     <li>soit un message d'erreurs</li>
       * </ul>
       */

      getScore: function () {
        return $http({
          method : 'GET',
          url : constants.backendUrl + 'scores/',
          headers: {'Content-Type': 'application/json'}
        }).then(
          function (response) { // success de node js
            return response.data;
          },
          function (response) { // erreur de node js.
            return response.status;
          }
        );
      },


      postMap: function(data){
        return $http({
          method : 'POST',
          url: constants.backendUrl + 'map/',
          data: data,
          headers: {'Content-Type': 'application/json'}
        }).then(
          function (response) { // success de node js
            return response.data;
          },
          function (response) { // erreur de node js.
            return response.status;
          }
        );
      },


      /**
       * Cette fonction permet de poster un nouveau score du joueur courant en l'enregistrant en base de données.
       * Cette fonction retourne une promesse.
       *
       * @example Voici comment utiliser cette fonction :
       *  var shopsChosenArray = [ 1, 2, 3]
       *  serviceCtlr.postScore(int_score).then(
       *    // Fonction callback lors du success
       *    function (data) {
       *      console.log(data);
       *    },
       *    // Fonction callback d'erreur.
       *    function (msgErreur) {
       *      console.log(msgErreur);
       *    }
       *  );
       *
       * @param {Object} data - Un tableau contenant la liste des magasins choisis (leur id).
       * @returns {Function|promise} Retourne une promesse de réponse.
       */



    };
  }]);
