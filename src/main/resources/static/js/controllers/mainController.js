(function(){
  angular.module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['$location', '$route', '$routeParams'];

  function MainController($location, $route, $routeParams) {
    
    this.$location = $location;
    this.$route = $route;
    this.$routeParams = $routeParams;
    
  };
})();