'use strict'

angular.module('components.home', [])

.config(function($stateProvider, $urlRouterProvider) {
  var partialsPath =  'components/home/';

  $stateProvider
  // Home
  .state('home', {
    url: '/',
    templateUrl: partialsPath + 'home.html',
    controller: 'HomeController'
  });

})

.controller('HomeController', ['$scope', function($scope) {
  console.log('HomeController');
}]);