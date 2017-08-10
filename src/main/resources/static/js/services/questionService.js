(function () {
  angular.module("app")
    .factory('QuestionService', QuestionService);

  QuestionService.$inject = ['$http', '$q'];

  function QuestionService($http, $q) {

    var service = {
      saveQuestion: saveQuestion
    }
    
    function saveQuestion(question) {
    	var def = $q.defer();
        var req = {
          method: 'POST',
          url: "question",
          data: question
        }
        $http(req).success(function (data) {
          def.resolve(data);
        })
          .error(function () {
          def.reject("Failed to save a question!");
        });
        return def.promise;
    }

    return service;

  }
} ());