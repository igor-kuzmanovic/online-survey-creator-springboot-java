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
		Answer savedAnswer = null;
		
		if(answer.getId() == null) {
			Question question = questionService.findOne(questionId);
			Long answerPosition = (long) question.getAnswers().size() + 1;
			answer.setPositionInQuestion(answerPosition);
			question.getAnswers().add(answer);
			Question updatedQuestion = questionService.save(question);
			List<Answer> answerList = updatedQuestion.getAnswers();
			
			for(int i = 0; i < answerList.size(); i++) {
				if (answerList.get(i).getContent() == answer.getContent()) {
					savedAnswer = answerList.get(i);
				}
			}
		}
		else {
			savedAnswer = answerService.save(answer);
		}
		
    	return new ResponseEntity<>(savedAnswer, HttpStatus.OK);
    }
	
	@DeleteMapping(path = "/{id}")
	public ResponseEntity<Object> delete(@PathVariable Long id) {
		answerService.delete(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}