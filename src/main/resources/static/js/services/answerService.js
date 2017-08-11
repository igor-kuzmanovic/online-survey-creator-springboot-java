(function () {
  angular.module("app")
    .factory('AnswerService', AnswerService);

  AnswerService.$inject = ['$http', '$q'];

  function AnswerService($http, $q) {

    var service = {
      saveAnswer: saveAnswer
    }
    
    function saveAnswer(answer) {
    	var def = $q.defer();
        var req = {
          method: 'POST',
          url: "answer",
          data: answer
        }
        $http(req).success(function (data) {
          def.resolve(data);
        })
          .error(function () {
          def.reject("Failed to save an answer!");
        });
        return def.promise;
    }

    return service;

  }
} ());