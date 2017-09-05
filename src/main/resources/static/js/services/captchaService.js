(function () {
  angular.module("app")
    .factory('CaptchaService', CaptchaService);

  CaptchaService.$inject = ['$http', '$q',];

  function CaptchaService($http, $q) {

    var service = {
      sendCaptchaResponse: sendCaptchaResponse
    }

    function sendCaptchaResponse(response) {
      var def = $q.defer();
      var req = {
        method: 'POST',
        url: "/api/captcha/" + response,
      };
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function (response) {
        def.reject(response);
      });
      return def.promise;
    }

    return service;

  }
}());
