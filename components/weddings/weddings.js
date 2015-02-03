'use strict'

angular.module('components.weddings', [
  'components.shared.utils',
  'components.shared.constants',
  'components.photoset'
  ])

.config(function($stateProvider, $urlRouterProvider) {
  var partialsPath =  'components/weddings/';

  $stateProvider
  // Home
  .state('weddings', {
    url: '/weddings',
    templateUrl: partialsPath + 'weddings.html'
  });

})

.controller('WeddingsController', WeddingsController)

function WeddingsController($scope, Utils, ImageBoxFactory, WEDDING_PHOTOSETS) {
  var vm = this;
  vm.photosets = [];

  angular.forEach(WEDDING_PHOTOSETS, function(photosetId, key) {
    Utils.getPhotosetInfo(photosetId)
    .then(
      function(response) {
        vm.photosets.push(response);
      }, function(error) {
        console.log(error);
      });
  });

  vm.openImage = function(imageObject) {
    ImageBoxFactory.showImage(imageObject);
  };

}