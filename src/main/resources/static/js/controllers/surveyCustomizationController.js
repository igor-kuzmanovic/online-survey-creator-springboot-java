(function(){
	angular.module('app')
		.controller('SurveyCustomizationController', SurveyCustomizationController);

	SurveyCustomizationController.$inject = ['SurveyService', 'QuestionService', 'AnswerService', '$location', '$routeParams'];

	function SurveyCustomizationController(SurveyService, QuestionService, AnswerService, $location, $routeParams) {

		var self = this;
		self.saveQuestions = saveQuestions;
		self.createNewQuestion = createNewQuestion;
		self.createNewAnswer = createNewAnswer;

		init();

		function init() {
			self.surveyHashedId = $routeParams.hashedId;
			SurveyService.getCurrentSurvey(self.surveyHashedId)
				.then(
				function(response){
					self.survey = response;
				});
		}

		function saveQuestions() {

			var location = $location.path().replace("new", "new/finish");
			$location.path(location);
		};

		function createNewQuestion() {
			if (!self.questionList) {
				self.questionList = [];
			}

			if (self.questionList.length < 10) {
				var newQuestionPosition = self.questionList.length + 1;
				var newQuestion = {
					content: "",
					positionInSurvey: newQuestionPosition
				};

				self.questionList.push(newQuestion);
			};
		};

		function createNewAnswer(questionId) {
			if (!self.questionList[questionId].answerList) {
				self.questionList[questionId].answerList = [];
			};

			if (self.questionList[questionId].answerList.length < 10) {
				var newAnswerPosition = self.questionList[questionId].answerList.length + 1;
				var newAnswer = {
					content: "",
					positionInQuestion: newAnswerPosition
				};

				self.questionList[questionId].answerList.push(newAnswer);
			};
		};

	};
})();