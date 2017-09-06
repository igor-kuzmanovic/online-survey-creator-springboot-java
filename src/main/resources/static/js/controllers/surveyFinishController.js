(function() {
  angular.module('app')
      .controller('SurveyFinishController', SurveyFinishController);

  SurveyFinishController.$inject = ['SurveyService', 'CommentService', 'NotificationService', 'UserService', 'ImageService', '$location', '$routeParams', '$scope'];

  function SurveyFinishController(SurveyService, CommentService, NotificationService, UserService, ImageService, $location, $routeParams, $scope) {

    var self = this;
    self.getCurrentSurvey = getCurrentSurvey;
    self.postComment = postComment;
    self.deleteComment = deleteComment;
    self.reportComment = reportComment;

    self.allComments = [];
    self.user = {};
    self.comment = {};
    var imageUserMap;

    init();

    function init() {
      self.user = $scope.mc.checkUser();
      self.surveyHashedId = $routeParams.hashedId;
      getCurrentSurvey();
    }

    function loadImages() {
        ImageService.getAllImagesBinary().then(function (data, status) {
            imageUserMap = data;
            self.allComments = self.survey.comments;
            for(var i = 0; i < self.allComments.length; i++) {
                self.allComments[i].image = data[self.allComments[i].poster];
            }
        });
    }

    function getCurrentSurvey(commentPosted) {
      SurveyService.getCurrentSurvey(self.surveyHashedId)
        .then(
        function(response){
          self.survey = response;
          loadImages();

          if(commentPosted) {
            postNotification();
          }
          
          checkSurvey();
        },
        function(error){
          console.log(error);
          self.initError = error;
        });
    }

    function checkSurvey() {
      if(self.survey.isActive) {
        if(self.user && self.survey.creator === self.user.username) {
          console.log("You cannot complete your own survey!");
          self.error = "You cannot complete your own survey!";
        }
      }
      else {
        $location.path('/survey/results/' + self.surveyHashedId);
      }
    }

    function postComment() {
      if(!checkForm()){
        return;
      }
      
      CommentService.postComment(self.survey, self.comment)
        .then(
        function(response) {
          getCurrentSurvey(true);
          self.comment.image = imageUserMap[self.comment.poster];
          self.allComments.push(self.comment);
          self.comment = {};
          self.commentForm.$setPristine();
        }, 
        function(error){
          console.log(error);
          self.error = error;
        })
    }

    function checkForm() {
      var focusedElement;

      if(self.commentForm.$invalid) {
        if(self.commentForm.comment.$invalid) {
          self.commentForm.comment.$setDirty();
          focusedElement = '#comment';
        }

        return false;
      }

      return true;
    }

    function deleteComment(commentId){
      CommentService.deleteComment(commentId)
        .then(
        function(response){
          getCurrentSurvey();
        }, 
        function(error){
          console.log(error);
          self.error = error;
        })
    }

    function postNotification() {
      NotificationService.postCommentNotification(self.survey.comments[self.survey.comments.length - 1])
        .then(
        function(response) {},
        function(error){
          console.log(error);
          self.error = error;
        })
    }

   function reportComment(commentId) {
      NotificationService.reportCommentNotification(commentId)
        .then(function(response){}, function(error){
        console.log(error);
        self.error = error;
      })
   }

  }
})();