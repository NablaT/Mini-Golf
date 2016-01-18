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
      .when('/gameConfiguration',{
        templateUrl: 'views/gameConfiguration.html',
        controller: 'ConfigurationGameCtrl',
        controllerAs: 'gameConfiguration'
      })
      .when('/loading',{
        templateUrl: 'views/loading.html',
        controller: 'LoadingCtrl',
        controllerAs: 'loading'
      })
      .when('/homepage',{
        templateUrl: 'views/homepage.html',
        controller: 'HomepageCtrl',
        controllerAs: 'homepage'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
