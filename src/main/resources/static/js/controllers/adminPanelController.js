(function () {
	angular.module('app')
		.controller('AdminPanelController', AdminPanelController);

	AdminPanelController.$inject = ['SurveyService', 'UserService', 'CommentService', 'QuestionService', 'AnswerService', '$scope', '$location'];

	function AdminPanelController(SurveyService, UserService, CommentService, QuestionService, AnswerService, $scope, $location) {

		var self = this;
		self.menuSelected = menuSelected;
		self.setCurrentUser = setCurrentUser;
		self.removeUser = removeUser;
		self.blockUser = blockUser;
		self.setCurrentSurvey = setCurrentSurvey;
		self.removeSurvey = removeSurvey;
		self.allowSurvey = allowSurvey;
		self.setCurrentComment = setCurrentComment;
		self.removeComment = removeComment;
		self.allowComment = allowComment;

		self.active = "users";
		self.banDays = "7";

		init();

		function init() {
			if(!$scope.mc.checkUser()) {
				$location.path('/');
			}
			else {
				getAllSurveys();
				getAllUsers(); 
			}
		}

		function setCurrentUser(user) {
			self.currentUser = user;
		}

		function getAllSurveys() {
			SurveyService.getSurveys()
				.then(
				function(response){
					self.surveys = response;
					getAllComments();
					getAllQuestions();
					getAllAnswers();
				},
				function(error){
					console.log(error);
					self.error = error;
				});
		}

		function getAllUsers() {
			UserService.findAllUsers()
				.then(
				function(response){
					self.users = response;
				},
				function(error){
					console.log(error);
					self.error = error;
				});
		}

		function getAllComments() {
			self.allComments = [];

			for(i = 0; i < self.surveys.length; i++) {
				for(var j = 0; j < self.surveys[i].comments.length; j++) {
					self.surveys[i].comments[j].survey = self.surveys[i].name;
					self.allComments.push(self.surveys[i].comments[j]);
				}
			}
		}

		function getAllQuestions() {
			self.allQuestions = [];

			for(i = 0; i < self.surveys.length; i++) {
				for(var j = 0; j < self.surveys[i].questions.length; j++) {
					self.surveys[i].questions[j].survey = self.surveys[i].name;
					self.allQuestions.push(self.surveys[i].questions[j]);
				}
			}
		}

		function getAllAnswers() {
			self.allAnswers = [];

			for(i = 0; i < self.surveys.length; i++) {
				for(var j = 0; j < self.surveys[i].questions.length; j++) {
					for(var k = 0; k < self.surveys[i].questions[j].answers.length; k++) {
						self.surveys[i].questions[j].answers[k].question = self.surveys[i].questions[j].content;
						self.allAnswers.push(self.surveys[i].questions[j].answers[k]);
					}
				}
			}
		}

		function blockUser(user) {
			if(user) {
				self.currentUser = user;
			}

			if(isAdmin()) {
				console.log("You can't block an admin");
				self.error = "You can't block an admin";
				$('#banUserModal').modal('hide');
				return;
			}

			UserService.toggleUserBlock(self.currentUser.id, self.banDays).then(function (data, status) {
				$('#banUserModal').modal('hide');
				getAllUsers();
			});
		}

		function removeUser() {
			if(isAdmin()) {
				console.log("You can't delete an admin");
				self.error = "You can't delete an admin";
				$('#deleteUserModal').modal('hide');
				return;
			}

			UserService.deleteUser(self.currentUser.id)
				.then(
				function(response) {
					$('#deleteUserModal').modal('hide');
					getAllUsers();
					getAllSurveys();
				},
				function(error){
					console.log(error);
					self.error = error;
				});
		}

		function setCurrentSurvey(survey) {
			self.currentSurvey = survey;
		}

		function removeSurvey() {
			SurveyService.deleteSurvey(self.currentSurvey.id)
				.then(
				function(response) {
					$('#removeSurveyModal').modal('hide');
					getAllSurveys();
					getAllComments();
					getAllQuestions();
					getAllAnswers();
				}, 
				function(error){
					console.log(error);
					self.error = error;
				})
		}

		function allowSurvey() {
			SurveyService.allowSurvey(self.currentSurvey.id)
				.then(
				function(response) {
					$('#allowSurveyModal').modal('hide');
					getAllSurveys();
				}, 
				function(error){
					console.log(error);
					self.error = error;
				})
		}

		function setCurrentComment(comment) {
			self.currentComment = comment;
		}

		function removeComment() {
			CommentService.deleteComment(self.currentComment.id)
				.then(
				function(response) {
					$('#removeCommentModal').modal('hide');
					getAllSurveys();
				}, 
				function(error){
					console.log(error);
					self.error = error;
				})
		}

		function allowComment() {
			CommentService.allowComment(self.currentComment.id)
				.then(
				function(response) {
					$('#allowCommentModal').modal('hide');
					getAllSurveys();
				}, 
				function(error){
					console.log(error);
					self.error = error;
				})
		}

		function isAdmin() {
			for(var i = 0; i < self.currentUser.roles.length; i++) {
				if(self.currentUser.roles[i].type === 'ROLE_ADMIN') {
					self.isAdmin = true;
				}
			}

			if(self.isAdmin) {
				return true;
			}

			return false;
		}

		function menuSelected(menu) {
			self.error = '';

			switch(menu) {
				case 'users':
					self.active = 'users';
					break;
				case 'surveys':
					self.active = 'surveys';
					break;
				case 'answers':
					self.active = 'answers';
					break;
				case 'questions':
					self.active = 'questions';
					break;
				case 'comments':
					self.active = 'comments';
					break;
								 }
		}

	}
})();