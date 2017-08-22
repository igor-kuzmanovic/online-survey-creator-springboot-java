(function() {
  angular.module('app')
    .controller('SurveyFinishController', SurveyFinishController);

  SurveyFinishController.$inject = ['SurveyService', 'CommentService', '$routeParams'];

  function SurveyFinishController(SurveyService, CommentService, $routeParams) {
    
    var self = this;
    self.postComment = postComment;
    self.deleteComment = deleteComment;
    self.getCurrentSurvey = getCurrentSurvey;
    self.getSurveyComments = getSurveyComments;
    
    init();

    function init() {
      self.surveyHashedId = $routeParams.hashedId;
      self.comment = {};
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
    
    function postComment() {
      CommentService.postComment(self.survey, self.comment).then(function(response) {
        getSurveyComments();
        self.comment = {};
      }, function(error){
        console.log(error);
      })
    }
    
    function getSurveyComments() {
      SurveyService.getSurveyComments(self.survey).then(handleSuccessSurveyComments);
    }
    
    function handleSuccessSurveyComments(data, status) {
      self.comments = data;
    }
    
    function deleteComment(commentId){
      CommentService.deleteComment(commentId).then(function(response){
        getSurveyComments();
      }, function(error){
        console.log(error);
      })
    }
    
  };
})();