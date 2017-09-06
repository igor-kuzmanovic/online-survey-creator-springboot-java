package com.example.tech9_survey.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tech9_survey.domain.Result;
import com.example.tech9_survey.domain.Survey;
import com.example.tech9_survey.domain.SurveyResult;
import com.example.tech9_survey.domain.User;
import com.example.tech9_survey.service.ResultService;
import com.example.tech9_survey.service.SurveyService;
import com.example.tech9_survey.service.UserService;

@RestController
@RequestMapping("/api/result")
public class ResultController {
	
	private ResultService resultService;
	private SurveyService surveyService;
	private UserService userService;
	
	@Autowired
	public ResultController(ResultService resultService, SurveyService surveyService, UserService userService) {
		this.resultService = resultService;
		this.surveyService = surveyService;
		this.userService = userService;
	}
	
	// Unused
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@GetMapping
	public ResponseEntity<List<SurveyResult>> findAll() {
		List<SurveyResult> surveyResults = resultService.findAll();
		
		if(surveyResults.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<>(surveyResults, HttpStatus.OK);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@GetMapping(path = "/survey/{surveyId}")
	public ResponseEntity<List<SurveyResult>> findBySurveyId(@PathVariable Long surveyId) {
		Survey survey = surveyService.findOne(surveyId);
		
		if(survey == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		List<SurveyResult> surveyResults = resultService.findBySurveyId(surveyId);
		
		if(surveyResults.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<>(surveyResults, HttpStatus.OK);
	}
	
	// Unused
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@GetMapping(path = "/{id}")
	public ResponseEntity<SurveyResult> findOne(@PathVariable Long id) {
		SurveyResult surveyResult = resultService.findOne(id);
		
		if(surveyResult == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(surveyResult, HttpStatus.OK);
	}
	
	@PostMapping(path = "/{surveyId}")
	public ResponseEntity<Object> save(@PathVariable Long surveyId, @RequestBody SurveyResult surveyResult) {
		Survey survey = surveyService.findOne(surveyId);
		
		if(survey == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		User user = userService.getLoggedInUser();
		
		if(user != null && user.getUsername().equals(survey.getCreator())) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		
		List<SurveyResult> surveyResults = survey.getSurveyResults();
		
		for(int i = 0; i < surveyResults.size(); i++) {
			String poster = surveyResults.get(i).getSubmitedBy();
			
			if(user != null && poster.equals(user.getUsername())) {
				return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
			}
		}
		
		List<Result> results = surveyResult.getResults();
		
		for(int i = 0; i < results.size(); i++) {
			Result result = results.get(i);
			
			if(result.getAnswerId() != 0 && !result.getOptional().isEmpty()) {
				result.setOptional("");
				results.set(i, result);
			}
		}
		
		surveyResult.setResults(results);		
		
		if(user == null) {
			surveyResult.setSubmitedBy("anonymous");
		}
		else {
			surveyResult.setSubmitedBy(user.getUsername());
		}
		
		surveyResult.setSurveyId(survey.getId());
		survey.getSurveyResults().add(surveyResult);
		surveyService.save(survey);
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	// Unused
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@DeleteMapping(path = "/{id}")
	public ResponseEntity<Object> delete(@PathVariable Long id) {
		SurveyResult surveyResult = resultService.findOne(id);
		
		if(surveyResult == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		resultService.delete(id);
		
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
