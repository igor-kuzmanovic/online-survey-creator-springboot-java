(function() {
  angular.module('app')
    .controller('SurveyFinishController', SurveyFinishController);

  SurveyFinishController.$inject = ['SurveyService', 'CommentService', '$location', '$routeParams', '$scope'];

  function SurveyFinishController(SurveyService, CommentService, $location, $routeParams, $scope) {

    var self = this;
    self.getCurrentSurvey = getCurrentSurvey;
    self.postComment = postComment;
    self.deleteComment = deleteComment;
    
    self.user = {};

    init();

    function init() {
      self.user = $scope.mc.checkUser();
      self.surveyHashedId = $routeParams.hashedId;
      getCurrentSurvey();
    }

    function getCurrentSurvey() {
      SurveyService.getCurrentSurvey(self.surveyHashedId)
        .then(
        function(response){
          self.survey = response;
        })
    }

    function postComment() {
      CommentService.postComment(self.survey, self.comment).then(function(response) {
        getCurrentSurvey();
        self.comment = '';
      }, function(error){
        console.log(error);
      })
    }

    function deleteComment(commentId){
      CommentService.deleteComment(commentId).then(function(response){
        getCurrentSurvey();
      }, function(error){
        console.log(error);
      })
    }

  }
})();