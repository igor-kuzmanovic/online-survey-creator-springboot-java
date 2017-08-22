(function() {
  angular.module('app')
    .controller('SurveyFinishController', SurveyFinishController);

  SurveyFinishController.$inject = ['SurveyService', 'CommentService', '$routeParams', '$scope'];

  function SurveyFinishController(SurveyService, CommentService, $routeParams, $scope) {

    var self = this;
    self.getCurrentSurvey = getCurrentSurvey;
    self.getSurveyComments = getSurveyComments;
    self.postComment = postComment;
    self.deleteComment = deleteComment;

    init();

    function init() {
      $scope.mc.checkUser();
      self.surveyHashedId = $routeParams.hashedId;
      getCurrentSurvey();
    }

    function getCurrentSurvey() {
      SurveyService.getCurrentSurvey(self.surveyHashedId)
        .then(
        function(response){
          self.survey = response;
          getSurveyComments();
        })
    }

    function getSurveyComments() {
      SurveyService.getSurveyComments(self.survey).then(handleSuccessSurveyComments);
    }

    function handleSuccessSurveyComments(data, status) {
      self.comments = data;
    }

    function postComment() {
      CommentService.postComment(self.survey, self.comment).then(function(response) {
        getSurveyComments();
        self.comment = {};
      }, function(error){
        console.log(error);
      })
    }

    function deleteComment(commentId){
      CommentService.deleteComment(commentId).then(function(response){
        getSurveyComments();
      }, function(error){
        console.log(error);
      })
    }

  }
})();