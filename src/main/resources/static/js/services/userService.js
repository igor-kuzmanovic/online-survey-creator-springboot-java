(function () {
  angular.module("app")
    .factory('UserService', UserService);

  UserService.$inject = ['$http', '$q', '$filter'];

  function UserService($http, $q, $filter) {

    var user;
    var base64Credential;

    var service = {
      login: login,
      getUser: getUser,
      saveUser: saveUser,
      removeUser: removeUser,
      findUser: findUser,
      editUser: editUser,
      setUser: setUser,
      sendCaptchaResponse: sendCaptchaResponse
    };

    function login(credentials) {
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
        def.resolve(data);
      })
        .error(function (response) {
        def.reject(response);
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
        def.reject(response);
      });
      return def.promise;
    }

    function editUser(user) {
      var def = $q.defer();
      var req = {
        method: 'PUT',
        url: "/api/users/",
        data: user
      };
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function (response) {
        def.reject(response);
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

    function removeUser() {
      $http.defaults.headers.common['Authorization'] = null;
      delete user;
    }

    function getUser() {
      return user;
    }

    function setUser(editedUser) {
      base64Credential = btoa(editedUser.username + ':' + editedUser.password);
      $http.defaults.headers.common['Authorization'] = 'Basic ' + base64Credential;
      user = editedUser;
    }

    return service;
  }
} ());