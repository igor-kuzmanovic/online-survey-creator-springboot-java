(function () {
  angular.module("app")
    .factory('UserService', UserService);

  UserService.$inject = ['$http', '$q', '$filter'];

  function UserService($http, $q, $filter) {

    var user;
    var loggedUser;

    var service = {
      login: login,
      getUser: getUser,
      saveUser: saveUser,
      removeUser: removeUser,
      findUser: findUser,
      editUser: editUser,
      setUser: setUser
    };

    function login(credentials) {
      var def = $q.defer();
      var base64Credential = btoa(credentials.username + ':' + credentials.password);
      var req = {
        method: 'GET',
        url: "users/login",
        headers: {
          'Authorization': 'Basic ' + base64Credential
        }
      };
      $http(req)
        .success(function (data) {
        user = data;
        console.log(user);
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
        url: "users",
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
              url: "users/" + username
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
              url: "users/",
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

    function removeUser() {
      user = null;
    }

    function getUser() {
      return user;
    }

    function setUser(editedUser) {
        user = editedUser;
    }

    return service;
  }
} ());