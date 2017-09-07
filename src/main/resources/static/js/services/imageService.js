(function () {
    angular.module("app")
        .factory('ImageService', ImageService);

    ImageService.$inject = ['$http', '$q'];

    function ImageService($http, $q) {

        var service = {
            getAllImagesBinary: getAllImagesBinary,
            getAllImages: getAllImages
        };
        
        function getAllImages() {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "/api/image/"
            };
            $http(req).success(function (data) {
                def.resolve(data);
            })
                .error(function (response) {
                    def.reject(response);
                });
            return def.promise;
        }

        function getAllImagesBinary() {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: "/api/image/all"
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