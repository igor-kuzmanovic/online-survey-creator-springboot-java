(function () {
  angular.module("app")
    .factory('CookieService', CookieService);

  CookieService.$inject = ['$cookies'];

  function CookieService($cookies) {

    var service = {
      createCookie: createCookie,
      deleteCookie: deleteCookie,
      getCookie: getCookie
    }

    function createCookie(key, value) {
      deleteCookie(key);
      $cookies.put(key, value);
      console.log('Cookie ' + key + ' created');
    }

    function deleteCookie(key) {
      if(getCookie(key)) {
        $cookies.remove(key);
        console.log('Cookie ' + key +  ' removed');
      }
    }

    function getCookie(key) {
      if($cookies.get(key)) {
        console.log('Cookie ' + key + ' found');
        return $cookies.get(key);
      }

      console.log('Cookie ' + key + ' not found');
      return null;
    }

    return service;

  }
}());
