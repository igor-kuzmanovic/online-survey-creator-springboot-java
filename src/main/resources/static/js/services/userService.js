(function () {
  angular.module("app")
    .factory('UserService', UserService);

  UserService.$inject = ['$http', '$q', '$filter', 'CookieService'];

  function UserService($http, $q, $filter, CookieService) {

    var user;
    var registeredUser;
    var base64Credential;

    var service = {
      login: login,
      getUser: getUser,
      saveUser: saveUser,
      removeUser: removeUser,
      findUser: findUser,
      editUser: editUser,
      setUser: setUser,
      sendCaptchaResponse: sendCaptchaResponse,
      getImageFromUrl: getImageFromUrl,
      getUserNotifications: getUserNotifications,
      checkUserCookies: checkUserCookies
    };

    function login(credentials, rememberMe) {
      base64Credential = btoa(credentials.username + ':' + credentials.password);

      var def = $q.defer();      
      var req = {
        method: 'GET',
        url: "/api/users/login",
        headers: {
          'Authorization': 'Basic ' + base64Credential
        }
      };
      $http(req)
        .success(function (data) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + base64Credential;

        if(rememberMe) {
          CookieService.createCookie('username', credentials.username);
          CookieService.createCookie('password', credentials.password);
        }

        user = data;
        def.resolve(data);
      })
        .error(function () {
        def.reject("Bad credentials");
      });
      return def.promise;
    }

    function saveUser(savedUser) {
      var def = $q.defer();
      var req = {
        method: 'POST',
        url: "/api/users",
        data: savedUser
      };
      $http(req).success(function (data) {
        registeredUser = data;
        def.resolve(data);
      })
        .error(function (response) {
        def.reject("Failed to save a user");
      });
      return def.promise;
    }

    function findUser(username) {
      var def = $q.defer();
      var req = {
        method: 'GET',
        url: "/api/users/" + username
      };
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function (response) {
        def.reject("Failed to find a user");
      });
      return def.promise;
    }

    function editUser(user) {
      var def = $q.defer();
      var req = {
        method: 'PUT',
        url: "/api/users",
        data: user
      };
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function (response) {
        def.reject("Failed to edit a user");
      });
      return def.promise;
    }

    function sendCaptchaResponse(response) {
      var def = $q.defer();
      var req = {
        method: 'POST',
        url: "/api/users/captchaResponse/" + response,
      };
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function (response) {
        def.reject(response);
      });
      return def.promise;
    }

    function getImageFromUrl() {
      var def = $q.defer();
      var req = {
        method: 'GET',
        url: "/upload/image",
        responseType: 'arraybuffer'
      };
      $http(req).success(function (data) {
        data = arrayBufferToBase64(data);
        def.resolve(data);
      })
        .error(function (response) {
        def.reject(response);
      });
      return def.promise;
    }

    function arrayBufferToBase64(buffer) {
      var binary = '';
      var bytes = new Uint8Array(buffer);
      var len = bytes.byteLength;

      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }

      return window.btoa(binary);
    }

    function removeUser() {
      $http.defaults.headers.common['Authorization'] = null;
      CookieService.deleteCookie('username');
      CookieService.deleteCookie('password');
      delete user;
    }

    function getUser() {
      return user;
    }

    function setUser(editedUser) {
      base64Credential = btoa(editedUser.username + ':' + editedUser.password);
      $http.defaults.headers.common['Authorization'] = 'Basic ' + base64Credential;
      user = editedUser;

      if(checkUserCookies()) {
        CookieService.createCookie('username', user.username);
        CookieService.createCookie('password', user.password);
      }
    }

    function getUserNotifications(user) {
      var def = $q.defer();
      var req = {
        method: 'GET',
        url: "/api/users/" + user.id + "/notifications"
      }
      $http(req)
        .success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to get notifications for selected user");
      });
      return def.promise;
    }

    function getCredentialsFromCookies() {
      var credentials = {}
      credentials.username = CookieService.getCookie('username');
      credentials.password = CookieService.getCookie('password');
      return credentials;  
    }

    function checkUserCookies() {
      return CookieService.getCookie('username') && CookieService.getCookie('password');
    }

    return service;
  }
}());