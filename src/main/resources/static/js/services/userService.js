(function () {
    angular.module("app")
        .factory('UserService', UserService);

    UserService.$inject = ['$http', '$q', '$filter'];

    function UserService($http, $q, $filter) {

        var user;

        var service = {
            login: login,
            getUser: getUser,
            saveUser: saveUser,
            removeUser: removeUser
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
            }
            $http(req).success(function (data) {
                def.resolve(data);
            })
                .error(function () {
                    def.reject("Failed to save a user");
                });
            return def.promise;
        }

        function removeUser() {
            user = null;
        }

        function getUser() {
            return user;
        }
        
        return service;
    }
} ());