'use strict'

angular.module('components.photoViewer', [
  'ui.router',
  'ngTouch',

  'components.shared.constants',
  'components.shared.utils'
  ])

.config(function($stateProvider, $urlRouterProvider) {
  var partialsPath =  'components/photoViewer/';

  $stateProvider

  .state('photo', {
    url: '/photo/:photoId',
    templateUrl: partialsPath + 'photoViewer.html'
  });

})

.controller('PhotoViewerController', PhotoViewerController)
.factory('PhotoViewerFactory', PhotoViewerFactory);

function PhotoViewerController($scope, $stateParams, PhotoViewerFactory, Utils) {
  var vm = this;
  var photoId = $stateParams.photoId;

  PhotoViewerFactory.getPhoto(photoId)
  .then(
    function(response) {
      vm.image = Utils.makeStaticUrls(
        response.farm,
        response.server,
        response.id,
        response.secret);
    },
    function(error) {
      console.log(error);
    });

  vm.nextImage = function() {
    alert('nextImage');
  };

  vm.previousImage = function() {
    alert('previousImage');
  };

}

function PhotoViewerFactory($rootScope, $http, FLICKR_API_URL) {
  var photoViewerFactory = {};
  var methodString = '&method=flickr.photos.getInfo';

  photoViewerFactory.getPhoto = function(photoId) {
    return $http.get(FLICKR_API_URL + methodString,
      {
        params: {
          photo_id: photoId
        }
      })
      .then(function(response) {
        photoViewerFactory.photo = response.data.photo;
        return photoViewerFactory.photo;
      }, function(error) {
        return $q.reject(error);
      });

  };

  return photoViewerFactory;
}