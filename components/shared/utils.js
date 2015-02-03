angular.module('components.shared.utils', [
  'components.shared.constants'
  ])

.factory('Utils', Utils);

function Utils($http, FLICKR_API_URL, EXTRAS_PARAMS) {
  var utils = {};

  utils.getRandom = function(collection, count) {
    return _.sample(collection, count);
  };

  utils.makeStaticUrls = function(farm, server, id, secret) {
    var imageUrls = {};
    var prefix = 'https://farm' + farm.toString() + '.staticflickr.com/'+ server + '/' + id + '_' + secret + '_';
    var suffix = '.jpg';

    imageUrls.url_q = prefix + 'q' + suffix;
    imageUrls.url_s = prefix + 's' + suffix;
    imageUrls.url_m = prefix + 'm' + suffix;
    imageUrls.url_n = prefix + 'n' + suffix;
    imageUrls.url_c = prefix + 'c' + suffix;
    imageUrls.url_b = prefix + 'b' + suffix;
    imageUrls.url_z = prefix + 'z' + suffix;
    return imageUrls;
  };

  utils.getPhotosetInfo = function(photosetId) {
    var methodString = '&method=flickr.photosets.getInfo';
    return $http.get(FLICKR_API_URL + methodString, {
      params: {
        photoset_id: photosetId
      }
    })
    .then(function(response) {
      response.data.photoset['url_m'] = utils.makeStaticUrl(
        response.data.photoset.farm,
        response.data.photoset.server,
        response.data.photoset.primary,
        response.data.photoset.secret);
      console.log(response.data.photoset);
      return response.data.photoset;
    }, function(error) {
      return $q.reject(error);
    });
  }

  return utils;
}