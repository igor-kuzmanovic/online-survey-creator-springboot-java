(function () {
	angular.module("app")
		.factory('AnswerService', AnswerService);

	AnswerService.$inject = ['$http', '$q'];

	function AnswerService($http, $q) {

		var service = {
			deleteAnswer: deleteAnswer,
			getAllAnswers: getAllAnswers,
		};

		function deleteAnswer(answerId) {
			var def = $q.defer();
			var req = {
				method: 'DELETE',
				url: "/api/answer/" + answerId
			};
			$http(req).success(function (data) {
				def.resolve(data);
			})
				.error(function () {
				def.reject("Failed to delete an answer!");
			});
			return def.promise;
		}

		function getAllAnswers() {
			var def = $q.defer();
			var req = {
				method: 'GET',
				url: "/api/answer/"
			};
			$http(req).success(function (data) {
				def.resolve(data);
			})
				.error(function () {
				def.reject("Failed to get all answers!");
			});
			return def.promise;
		}

		return service;

	}
} ());