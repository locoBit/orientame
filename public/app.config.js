'use strict';

// Declare app level module which depends on views, and components
angular.module('orientame', [
  'ngRoute',
  'frapontillo.bootstrap-duallistbox',
  'ui.bootstrap',

    // internal
    'resumen',

]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('');
  $locationProvider.html5Mode({enabled:false});

  $routeProvider
      .when('/orienta',{
          template:'<resumen></resumen>'
      })
      .when('/blog/1',{
        template:'<h1>Hola</h1>'
      })
      .when('/blog/2',{
          template:'<blog-list></blog-list>'
      })
      .otherwise({redirectTo: '/view1'});
}]);
