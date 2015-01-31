angular.module('components.shared.utils', [])

.factory('Utils', Utils);

function Utils() {
  var utils = {};

  utils.getRandom = function(collection, count) {
    return _.sample(collection, count);
  };

  return utils;
}