package com.example.tech9_survey.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.example.tech9_survey.domain.Survey;
import com.example.tech9_survey.service.SurveyService;

@RestController
@RequestMapping("/survey")
public class SurveyController {
	
	private SurveyService surveyService;
	
	@Autowired
	public SurveyController(SurveyService surveyService) {
		this.surveyService = surveyService;
	}
	
    @PostMapping
    public ResponseEntity<Survey> save(@RequestBody Survey newSurvey) {
    	Survey generatedSurvey = surveyService.save(newSurvey);
    	return new ResponseEntity<>(generatedSurvey, HttpStatus.OK);
    }
    
    @GetMapping
    public ResponseEntity<List<Survey>> findAll() {
    	List<Survey> allSurveys = surveyService.findAll();
        return new ResponseEntity<>(allSurveys, HttpStatus.OK);
    }
}
