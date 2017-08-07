(function() {
    var app = angular
        .module('app', [ 'ngRoute', 'ngResource', 'ui.bootstrap']);

    app
        .config([
            '$httpProvider',
            function($httpProvider) {
                $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
            } ]);
})();