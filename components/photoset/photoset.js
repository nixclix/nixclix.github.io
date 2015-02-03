'use strict'

angular.module('components.photoset', [
  'ui.router',

  'components.shared.utils',
  'components.shared.constants',
  'components.photoViewer'

  ])

.config(function($stateProvider, $urlRouterProvider) {
  var partialsPath =  'components/photoset/';

  $stateProvider

  .state('photoset', {
    url: '/photoset/:photosetId',
    templateUrl: partialsPath + 'photoset.html'
  });

})

.controller('PhotosetController', PhotosetController);

function PhotosetController($scope, Utils, $stateParams) {
  var vm = this;
  vm.photosets = [];

  console.log('Photoset controller loaded with params ', $stateParams);

  vm.openImage = function(imageObject) {
    ImageBoxFactory.showImage(imageObject);
  };

}