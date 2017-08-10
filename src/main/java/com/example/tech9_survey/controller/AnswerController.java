package com.example.tech9_survey.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.example.tech9_survey.domain.Answer;
import com.example.tech9_survey.service.AnswerService;

@RestController
@RequestMapping("/answer")
public class AnswerController {

	private AnswerService answerService;
	
	@Autowired
	public AnswerController(AnswerService answerService) {
		this.answerService = answerService;
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Answer> save(@RequestBody Answer answer) {
    	Answer newAnswer = answerService.save(answer);
    	return new ResponseEntity<>(newAnswer, HttpStatus.OK);
    }
}