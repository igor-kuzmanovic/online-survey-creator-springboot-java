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

	@GetMapping
	public ResponseEntity<List<Question>> findAll() {
		List<Question> allQuestions = questionService.findAll();
		return new ResponseEntity<>(allQuestions, HttpStatus.OK);
	}
	
	@GetMapping(path = "/{id}")
	public ResponseEntity<Question> findOne(@PathVariable Long id) {
		Question question = questionService.findOne(id);
		return new ResponseEntity<>(question, HttpStatus.OK);
	}
	
	@PostMapping(path = "/{surveyId}")
	public ResponseEntity<Question> save(@PathVariable Long surveyId, @RequestBody Question question) {
		Question savedQuestion = questionService.save(question);
    	return new ResponseEntity<>(savedQuestion, HttpStatus.OK);
    }
	
	@DeleteMapping(path = "/{questionId}")
	public ResponseEntity<Object> delete(@PathVariable Long questionId) {
		questionService.delete(questionId);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
