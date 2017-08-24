package com.example.tech9_survey.controller;

import java.security.NoSuchAlgorithmException;
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

import com.example.tech9_survey.domain.Survey;
import com.example.tech9_survey.domain.SurveyResult;
import com.example.tech9_survey.service.ResultService;
import com.example.tech9_survey.service.SurveyService;

@RestController
@RequestMapping("/api/result")
public class ResultController {
	
	private ResultService resultService;
	private SurveyService surveyService;
	
	@Autowired
	public ResultController(ResultService resultService, SurveyService surveyService) {
		this.resultService = resultService;
		this.surveyService = surveyService;
	}
	
	@GetMapping
	public ResponseEntity<List<SurveyResult>> findAll() {
		List<SurveyResult> surveyResults = resultService.findAll();
		return new ResponseEntity<>(surveyResults, HttpStatus.OK);
	}
	
	@GetMapping(path = "/{id}")
	public ResponseEntity<SurveyResult> findOne(@PathVariable Long id) {
		SurveyResult surveyResult = resultService.findOne(id);
		return new ResponseEntity<>(surveyResult, HttpStatus.OK);
	}
	
	@GetMapping(path = "/survey/{surveyId}")
	public ResponseEntity<List<SurveyResult>> findBySurveyId(@PathVariable Long surveyId) {
		Survey survey = surveyService.findOne(surveyId);
		if(survey == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		List<SurveyResult> surveyResult = resultService.findBySurveyId(surveyId);
		return new ResponseEntity<>(surveyResult, HttpStatus.OK);
	}
	
	@PostMapping(path = "/{surveyId}")
	public ResponseEntity<Object> save(@PathVariable Long surveyId, @RequestBody SurveyResult surveyResult) throws NoSuchAlgorithmException {
		Survey survey = surveyService.findOne(surveyId);
		surveyResult.setSurvey(survey);
		survey.getResults().add(surveyResult);
		surveyService.save(survey);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@DeleteMapping(path = "/{id}")
	public ResponseEntity<Object> delete(@PathVariable Long id) {
		resultService.delete(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
