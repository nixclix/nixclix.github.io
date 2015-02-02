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

.controller('WeddingsController', WeddingsController)
.factory('WeddingsFactory', WeddingsFactory);

function WeddingsController($scope, WeddingsFactory, Utils, ImageBoxFactory) {
  var vm = this;

  WeddingsFactory.getRandomImages()
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

function WeddingsFactory($http, $q, FLICKR_API_URL, EXTRAS_PARAMS) {
  console.log(FLICKR_API_URL);

  var methodString = '&method=flickr.people.getPublicPhotos';
  var weddingsFactory = {};

  weddingsFactory.getRandomImages = function() {
    return $http.get(FLICKR_API_URL + methodString,
    {
      params: {
        per_page: 10000,
        extras: EXTRAS_PARAMS
      }
    })
    .then(function(response) {
      weddingsFactory.randomImages = response.data.photos;
      return weddingsFactory.randomImages;
    }, function(error) {
      return $q.reject(error);
    });
  }

  return weddingsFactory;
}