package com.example.tech9_survey.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
	
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Survey> save() {
    	Survey generatedSurvey = surveyService.save(new Survey());
    	return new ResponseEntity<>(generatedSurvey, HttpStatus.OK);
    }

}
