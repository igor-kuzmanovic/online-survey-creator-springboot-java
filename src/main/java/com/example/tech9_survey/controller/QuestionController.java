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
import com.example.tech9_survey.domain.Survey;
import com.example.tech9_survey.service.QuestionService;
import com.example.tech9_survey.service.SurveyService;

@RestController
@RequestMapping("/question")
public class QuestionController {

	private QuestionService questionService;
	private SurveyService surveyService;
	
	@Autowired
	public QuestionController(QuestionService questionService, SurveyService surveyService) {
		this.questionService = questionService;
		this.surveyService = surveyService;
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
		Question savedQuestion = question;
		Survey survey = surveyService.findOne(surveyId);
		
		if(question.getId() == null) {
			Long questionPosition = (long) survey.getQuestions().size() + 1;
			question.setPositionInSurvey(questionPosition);
			survey.getQuestions().add(question);
			List<Question> questionList = survey.getQuestions();
			
			for(int i = 0; i < questionList.size(); i++) {
				if(questionList.get(i).getContent() == question.getContent()) {
					savedQuestion = questionList.get(i);
				}
			}
		}
		
		questionService.save(savedQuestion);
    	return new ResponseEntity<>(savedQuestion, HttpStatus.OK);
    }
	
	@DeleteMapping(path = "/{surveyId}/{questionId}")
	public ResponseEntity<Object> delete(@PathVariable Long surveyId, @PathVariable Long questionId) {
		Survey survey = surveyService.findOne(surveyId);
		List<Question> questionList = survey.getQuestions();
		int questionDeletePosition = 0;
		
		for(int i = 0; i < questionList.size(); i++) {			
			if(questionList.get(i).getId() == questionId) {
				questionDeletePosition = i;
				break;
			}
		}
		
		for(int i = questionList.size() - 1; i > questionDeletePosition; i--) {
			Long positionInSurvey = questionList.get(i).getPositionInSurvey() - 1;
			Question question = questionList.get(i);
			question.setPositionInSurvey(positionInSurvey);
			questionService.save(question);
		}
		
		survey.getQuestions().remove(questionDeletePosition);
		questionService.delete(questionId);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
