package com.example.tech9_survey.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
	
	@GetMapping
	public ResponseEntity<List<Answer>> findAll() {
		List<Answer> allAnswers = answerService.findAll();
		return new ResponseEntity<>(allAnswers, HttpStatus.OK);
	}
	
	@GetMapping(path = "/{id}")
	public ResponseEntity<Answer> findOne(@PathVariable Long id) {
		Answer answer = answerService.findOne(id);
		return new ResponseEntity<>(answer, HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Answer> save(@RequestBody Answer answer) {
    	Answer newAnswer = answerService.save(answer);
    	return new ResponseEntity<>(newAnswer, HttpStatus.OK);
    }
	
	@DeleteMapping(path = "/{id}")
	public ResponseEntity<Object> delete(@PathVariable Long id) {
		answerService.delete(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}