'use strict';

// Declare app level module which depends on views, and components
angular.module('orientame', [
  'ngRoute',
  'frapontillo.bootstrap-duallistbox',
  'ui.bootstrap',

    // internal
  'resumen',
  'resultado'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('');
  $locationProvider.html5Mode({enabled:false});

  $routeProvider
      .when('/start',{
          template:'<resumen></resumen>'
      })
      .otherwise({redirectTo: '/start'});
}]);
