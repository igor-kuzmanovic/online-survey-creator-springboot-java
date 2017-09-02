(function () {
	angular.module('app')
		.controller('SearchController', SearchController);

	SearchController.$inject = ['SurveyService', '$scope', '$location'];

	function SearchController(SurveyService, $scope, $location) {

		var self = this;
		self.facebookShare = facebookShare;

		self.facebookLink = [];
		self.twitterLink = [];
		self.googleLink = [];

		init();

		function init(){
			self.user = $scope.mc.checkUser();
			$scope.mc.getImage();

			if (!self.user) {
				$location.path('/');
			}

			getSurveys();			
		}

		function getSurveys(){
			SurveyService.getSurveys()
				.then(
				function(response){
					self.surveys = data;
				}, 
				function(error){
					console.log(error);
					alert(error);
				});
		}

		function facebookShare(id) {
			var facebookHref = 'https://tech9survey.github.io/#/' + id + '/';

			FB.ui({
				method: 'share',
				display: 'popup',
				href: facebookHref,
			}, function(response){});
		}
	};
})();
