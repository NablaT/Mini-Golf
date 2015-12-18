'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:JeuCtrl
 * @description
 * # JeuCtrl
 * Controller of the frontEndApp
 */

angular.module('frontEndApp')
  .factory("serviceCtrl", ['$q', '$http', 'constants', function ($q, $http, constants) {

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
        var deferred = $q.defer();
        $http({
          method : 'GET',
          url : constants.backendUrl + 'scores/',
          headers: {'Content-Type': 'application/json'}
        }).then(
          function (data) { // success de node js
            if (data.status === 200 ) { // success de la bdd
              deferred.resolve(data.data);
            }
            else { // erreur de la bdd
              deferred.reject('Erreur BDD : ' + data.status);
            }
          },
          function () { // erreur de node js.
            deferred.reject('Erreur de connexion !');
          }
        );
        return deferred.promise;
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
      // TODO : vérifier que la liste envoyée est bien une liste ne contenant que des integer pour les ids.
      postScore : function (data) {
        var deferred = $q.defer();
        $http({
          method: 'POST',
          url: constants.backendUrl + 'scores/',
          data: data,
          headers: {'Content-Type': 'application/json'}
        }).then(
          function (data) { // success de node js
            if (data.status === 200 ) { // success de la bdd
              deferred.resolve(data.data);
            }
            else { // erreur de la bdd
              deferred.reject('Erreur BDD : ' + data.status);
            }
          },
          function () { // erreur de node js.
            deferred.reject('Erreur de connexion !');
          }
        );
        return deferred.promise;
      }
    };
  }]);
