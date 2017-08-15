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
import com.example.tech9_survey.domain.Question;
import com.example.tech9_survey.service.AnswerService;
import com.example.tech9_survey.service.QuestionService;

@RestController
@RequestMapping("/answer")
public class AnswerController {

	private AnswerService answerService;
	private QuestionService questionService;
	
	@Autowired
	public AnswerController(AnswerService answerService, QuestionService questionService) {
		this.answerService = answerService;
		this.questionService = questionService;
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
	
	@PostMapping(path = "/{questionId}")
	public ResponseEntity<Answer> save(@PathVariable Long questionId, @RequestBody Answer answer) {
		Answer savedAnswer = answer;
		Question question = questionService.findOne(questionId);
		
		if(answer.getId() == null) {
			Long answerPosition = (long) question.getAnswers().size() + 1;
			answer.setPositionInQuestion(answerPosition);
			question.getAnswers().add(answer);
			List<Answer> answerList = question.getAnswers();
			
			for(int i = 0; i < answerList.size(); i++) {
				if(answerList.get(i).getContent() == answer.getContent()) {
					savedAnswer = answerList.get(i);
				}
			}
		}

		answerService.save(answer);
    	return new ResponseEntity<>(savedAnswer, HttpStatus.OK);
    }
	
	@DeleteMapping(path = "/{questionId}/{answerId}")
	public ResponseEntity<Object> delete(@PathVariable Long questionId, @PathVariable Long answerId) {
		Question question = questionService.findOne(questionId);
		List<Answer> answerList = question.getAnswers();
		int answerDeletePosition = 0;
		
		for(int i = 0; i < answerList.size(); i++) {			
			if(answerList.get(i).getId() == answerId) {
				answerDeletePosition = i;
				break;
			}
		}
		
		for(int i = answerList.size() - 1; i > answerDeletePosition; i--) {
			Long positionInQuestion = answerList.get(i).getPositionInQuestion() - 1;
			Answer answer = answerList.get(i);
			answer.setPositionInQuestion(positionInQuestion);
			answerService.save(answer);
		}
		
		question.getAnswers().remove(answerDeletePosition);
		answerService.delete(answerId);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}