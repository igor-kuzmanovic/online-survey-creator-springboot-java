(function() {
  angular.module('app')
    .controller('SurveyFinishController', SurveyFinishController);

  SurveyFinishController.$inject = ['SurveyService', 'CommentService', 'NotificationService', '$location', '$routeParams', '$scope'];

  function SurveyFinishController(SurveyService, CommentService, NotificationService, $location, $routeParams, $scope) {

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

    function getCurrentSurvey(commentPosted) {
      SurveyService.getCurrentSurvey(self.surveyHashedId)
        .then(
        function(response){
          self.survey = response;
          
          if(commentPosted) {
            postNotification();
          }
        })
    }

    function postComment() {
      CommentService.postComment(self.survey, self.comment).then(function(response) {
        getCurrentSurvey(true);
        self.comment = '';
      }, function(error){
        console.log(error);
      })
    }

    function postNotification() {
      NotificationService.postCommentNotification(self.survey.comments[self.survey.comments.length - 1])
        .then(
        function(response) {
          console.log("success");
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