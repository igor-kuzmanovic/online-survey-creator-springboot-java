package com.example.tech9_survey.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.tech9_survey.domain.Question;
import com.example.tech9_survey.service.QuestionService;
import com.example.tech9_survey.service.SurveyService;

@RestController
@RequestMapping("/question")
public class QuestionController {

	private QuestionService questionService;
	
	@Autowired
	public QuestionController(QuestionService questionService, SurveyService surveyService) {
		this.questionService = questionService;
	}
	
	@PostMapping
	public ResponseEntity<Question> save(@RequestBody Question question) {
    	Question newQuestion = questionService.save(question);
    	return new ResponseEntity<>(newQuestion, HttpStatus.OK);
    }
}
