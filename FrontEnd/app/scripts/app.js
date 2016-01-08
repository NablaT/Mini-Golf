'use strict';

/**
 * @ngdoc overview
 * @name frontEndApp
 * @description
 * # frontEndApp
 *
 * Main module of the application.
 */
angular
  .module('frontEndApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/jeu', {
        templateUrl: 'views/jeu.html',
        controller: 'JeuCtrl',
        controllerAs: 'about'
      })
      .when('/scores',{
        templateUrl: 'views/scores.html',
        controller: 'ScoresCtrl',
        controllerAs: 'scores'
      })
      .when('/configuration',{
        templateUrl: 'views/scores.html',
        controller: 'ScoresCtrl',
        controllerAs: 'scores'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
