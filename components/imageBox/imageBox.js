'use strict'

angular.module('components.imageBox', [
  'ngTouch'
  ])

.controller('ImageBoxController', ImageBoxController)
.factory('ImageBoxFactory', ImageBoxFactory);

function ImageBoxController($scope, ImageBoxFactory) {
  var vm = this;

  vm.showStatus = ImageBoxFactory.showStatus;

  vm.closeImageBox = function() {
    vm.showStatus = false;
  };

  $scope.$on('imageBoxShowStatusUpdated', function(event, args) {
    console.log(args);
    vm.showStatus = args.showStatus;
    vm.image = args.image;
  });

  vm.nextImage = function() {
    alert('next');
  };

}

function ImageBoxFactory($rootScope) {
  var imageBoxFactory = {
    showStatus: false
  };
  console.log('Loading ImageBox');

  imageBoxFactory.showImage = function(imageObject) {
    imageBoxFactory.showStatus = true;

    imageBoxFactory.image = imageObject;

    $rootScope.$broadcast('imageBoxShowStatusUpdated', {
      showStatus: imageBoxFactory.showStatus,
      image: imageBoxFactory.image
    });
  };

  return imageBoxFactory;
}