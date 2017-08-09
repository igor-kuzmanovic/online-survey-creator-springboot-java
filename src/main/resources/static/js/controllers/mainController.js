(function(){
  angular.module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['$location'];

  function MainController($location) {
		
		this.$location = $location;
    
  };
})();