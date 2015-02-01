'use strict'

angular.module('components.home', [
  'components.shared.constants',
  'components.shared.utils',
  'components.imageBox'
  ])

.config(function($stateProvider, $urlRouterProvider) {
  var partialsPath =  'components/home/';

  $stateProvider
  // Home
  .state('home', {
    url: '/',
    templateUrl: partialsPath + 'home.html'
  });

})

.controller('HomeController', HomeController)
.factory('HomeFactory', HomeFactory);

function HomeController($scope, HomeFactory, Utils, ImageBoxFactory) {
  var vm = this;

  HomeFactory.getRandomImages()
  .then(
    function(response) {
      vm.randomImages = Utils.getRandom(response.photo, 24);
    }, function(error) {
      console.log(error);
    });

  vm.openImage = function(imageObject) {
    ImageBoxFactory.showImage(imageObject);
  };

}

function HomeFactory($http, $q, FLICKR_API_URL, EXTRAS_PARAMS) {
  console.log(FLICKR_API_URL);

  var methodString = '&method=flickr.people.getPublicPhotos';
  var homeFactory = {};

  homeFactory.getRandomImages = function() {
    return $http.get(FLICKR_API_URL + methodString,
    {
      params: {
        per_page: 10000,
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