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

import com.example.tech9_survey.domain.Comment;
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
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
	@GetMapping
    public ResponseEntity<List<Survey>> findAll() {
    	List<Survey> allSurveys = surveyService.findAll();
        return new ResponseEntity<>(allSurveys, HttpStatus.OK);
    }
	
	@GetMapping(path = "/{hashedId}")
	public ResponseEntity<Survey> findByHashedId(@PathVariable String hashedId) {
		Survey survey = surveyService.findByHashedId(hashedId);
		return new ResponseEntity<>(survey, HttpStatus.OK);
	}
  
	@PostMapping
    public ResponseEntity<Survey> save(@RequestBody Survey survey) {
    	Survey createdSurvey = surveyService.save(survey);
    	return new ResponseEntity<>(createdSurvey, HttpStatus.OK);
    }
	
	@DeleteMapping(path = "/{id}")
	public ResponseEntity<Survey> delete(@PathVariable Long id) {
		surveyService.delete(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping(path = "/{id}/comment")
	public ResponseEntity<List<Comment>> findAllCommentsFromSurvey(@PathVariable Long id) {
		Survey survey = surveyService.findOne(id);
		
		if (survey == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
		return new ResponseEntity<>(survey.getComments(), HttpStatus.OK);
	}

}
