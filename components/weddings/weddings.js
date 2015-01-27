'use strict'

angular.module('components.weddings', [])

.config(function($stateProvider, $urlRouterProvider) {
  var partialsPath =  'components/weddings/';

  $stateProvider
  // Home
  .state('weddings', {
    url: '/weddings',
    templateUrl: partialsPath + 'weddings.html',
    controller: 'WeddingsController'
  });

})

.controller('WeddingsController', ['$scope', function($scope) {
  console.log('WeddingsController');
}]);