'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('orientame', [
  'ngRoute',
  'frapontillo.bootstrap-duallistbox',
  'ui.bootstrap',
  'highcharts-ng',

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
      .when('/report',{
          template:'<resultado></resultado>'
      })
      .otherwise({redirectTo: '/start'});
}]);
