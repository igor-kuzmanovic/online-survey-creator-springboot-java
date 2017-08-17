(function(){
  angular.module('app')
   .controller('SurveyDetailsController', SurveyDetailsController);
  
  SurveyDetailsController.$inject = ['CommentService'];
  
  function SurveyDetailsController(CommentService) {
    
    var self = this;
    self.postComment = postComment;
    self.deleteComment = deleteComment;
    self.getCurrentSurvey = getCurrentSurvey;
    self.saveSurvey = saveSurvey;
    
    init();

    function init() {
      self.surveyHashedId = $routeParams.hashedId;
      getCurrentSurvey();
    }

    function getCurrentSurvey() {
      SurveyService.getCurrentSurvey(self.surveyHashedId)
        .then(
        function(response){
          self.survey = response;
        });
    }
    
    function deleteComment(surveyId, commentId) {
      CommentService.deleteComment(commentId);
      self.saveSurvey;
    }
    
    function saveSurvey() {
      SurveyService.saveSurvey(self.survey)
        .then(
        function(response){
          self.survey = response;
        }, 
        function(error){
          console.log(error);
        })
    }
    
  }
})