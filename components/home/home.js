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
  HomeFactory.getRandomImages()
  .then(
    function(response) {
      console.log(response)
    }, function(error) {
      console.log(error);
    });

}

function HomeFactory($http, $q, FLICKR_API_URL, EXTRAS_PARAMS) {
  console.log(FLICKR_API_URL);

  var methodString = '&method=flickr.photos.search';
  var homeFactory = {};

  homeFactory.getRandomImages = function() {
    return $http.get(FLICKR_API_URL + methodString,
    {
      params: {
        extras: EXTRAS_PARAMS
      }
    })
    .then(function(response) {
      homeFactory.randomImages = response.data;
      return homeFactory.randomImages;
    }, function(error) {
      return $q.reject(error);
    });
  }

  return homeFactory;
}