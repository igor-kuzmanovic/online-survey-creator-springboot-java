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

        function arrayBufferToBase64(buffer) {
            var binary = '';
            var bytes = new Uint8Array(buffer);
            var len = bytes.byteLength;

            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }

            return window.btoa(binary);
        }

        return service;

    }
}());