package com.example.tech9_survey.controller;

import java.security.NoSuchAlgorithmException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
    public ResponseEntity<Survey> save(@RequestBody Survey survey) {
    	try {
			survey.generateHash();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
    	Survey newSurvey = surveyService.save(survey);
    	return new ResponseEntity<>(newSurvey, HttpStatus.OK);
    }

}
