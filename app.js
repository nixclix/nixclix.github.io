'use strict'

angular.module('nixclix', [
  'ui.router',

  // Application components.
  'components.shared.constants',
  'components.shared.utils',
  'components.home',
  'components.weddings'
])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('404', {
    url: '/404',
    templateUrl:  'components/shared/404.html'
  });

})

.run(function($state, FLICKR_API_URL) {
  $state.go('home');
});