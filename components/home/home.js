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

.controller('HomeController', HomeController)
.factory('HomeFactory', HomeFactory);

function HomeController($scope, HomeFactory) {
  var vm = this;

  HomeFactory.getRandomImages()
  .then(
    function(response) {
      vm.randomImages = response;
    }, function(error) {
      console.log(error);
    });

}

function HomeFactory($http, $q, FLICKR_API_URL, EXTRAS_PARAMS) {
  console.log(FLICKR_API_URL);

  var methodString = '&method=flickr.people.getPublicPhotos';
  var homeFactory = {};

  homeFactory.getRandomImages = function() {
    return $http.get(FLICKR_API_URL + methodString,
    {
      params: {
        per_page: 48,
        extras: EXTRAS_PARAMS
      }
    })
    .then(function(response) {
      homeFactory.randomImages = response.data.photos;
      return homeFactory.randomImages;
    }, function(error) {
      return $q.reject(error);
    });
  }

  return homeFactory;
}