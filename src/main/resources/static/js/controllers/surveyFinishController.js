(function() {
  angular.module('app')
    .controller('SurveyFinishController', SurveyFinishController);

  SurveyFinishController.$inject = ['SurveyService', 'CommentService', '$location', '$routeParams', '$scope'];

  function SurveyFinishController(SurveyService, CommentService, $location, $routeParams, $scope) {

    var self = this;
    self.getCurrentSurvey = getCurrentSurvey;
    self.postComment = postComment;
    self.deleteComment = deleteComment;
    self.reportComment = reportComment;

    self.user = {};
    self.comment = {};

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
          checkSurvey();
        })
    }

    function checkSurvey() {
      if(self.survey.isActive) {
        if(self.user && self.survey.creator === self.user.username) {
          window.alert("You cannot complete your own survey!");
          $location.path('/home');
        }
        checkSubmitter();
      }
      else {
        window.alert("This survey is not active!");
        $location.path('/survey/details/' + self.surveyHashedId);
      }
    }

    function postComment() {
      CommentService.postComment(self.survey, self.comment).then(function(response) {
        getCurrentSurvey();
        self.comment = {};
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

    function reportComment(commentId) {
      // Insert reporting logic
    }
  }
})();