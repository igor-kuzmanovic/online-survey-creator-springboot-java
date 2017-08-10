package com.example.tech9_survey.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.example.tech9_survey.domain.Question;
import com.example.tech9_survey.service.QuestionService;

@RestController
@RequestMapping("/question")
public class QuestionController {

	private QuestionService questionService;
	
	@Autowired
	public QuestionController(QuestionService questionService) {
		this.questionService = questionService;
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Question> save(@RequestBody Question question) {
    	Question newQuestion = questionService.save(question);
    	return new ResponseEntity<>(newQuestion, HttpStatus.OK);
    }
}
