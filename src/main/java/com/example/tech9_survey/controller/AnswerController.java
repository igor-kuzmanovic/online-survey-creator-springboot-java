package com.example.tech9_survey.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.tech9_survey.domain.Answer;
import com.example.tech9_survey.domain.Question;
import com.example.tech9_survey.domain.Survey;
import com.example.tech9_survey.domain.User;
import com.example.tech9_survey.service.AnswerService;
import com.example.tech9_survey.service.QuestionService;
import com.example.tech9_survey.service.SurveyService;
import com.example.tech9_survey.service.UserService;

@RestController
@RequestMapping("/api/answer")
public class AnswerController {

	private AnswerService answerService;
	private QuestionService questionService;
	private	UserService userService;
	private SurveyService surveyService;
	
	@Autowired
	public AnswerController(AnswerService answerService, QuestionService questionService, UserService userService, SurveyService surveyService) {
		this.answerService = answerService;
		this.questionService = questionService;
		this.userService = userService;
		this.surveyService = surveyService;
	}
	
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@GetMapping
	public ResponseEntity<List<Answer>> findAll() {
		List<Answer> answers = answerService.findAll();
		
		if(answers.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<>(answers, HttpStatus.OK);
	}
	
	// Unused
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@GetMapping(path = "/{id}")
	public ResponseEntity<Answer> findOne(@PathVariable Long id) {
		Answer answer = answerService.findOne(id);
		
		if(answer == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(answer, HttpStatus.OK);
	}
	
	// Unused
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@PostMapping(path = "/{questionId}")
	public ResponseEntity<Answer> save(@PathVariable Long questionId, @RequestBody Answer answer) {
		Question question = questionService.findOne(questionId);
		
		if(question == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		Survey survey = surveyService.findOne(question.getSurveyId());
				
		if(survey == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		User user = userService.getLoggedInUser();
		
		if(user == null || !user.getUsername().equals(survey.getCreator())) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		
		answer.setQuestionId(question.getId());
		question.getAnswers().add(answer);	
        questionService.save(question);
        
    	return new ResponseEntity<>(answer, HttpStatus.OK);
    }
	
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@DeleteMapping(path = "/{answerId}")
	public ResponseEntity<Object> delete(@PathVariable Long answerId) {
		Answer answer = answerService.findOne(answerId);
		
		if(answer == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		answerService.delete(answerId);
		
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}