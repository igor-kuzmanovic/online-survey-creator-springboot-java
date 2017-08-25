package com.example.tech9_survey.controller;

import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tech9_survey.domain.Answer;
import com.example.tech9_survey.domain.Comment;
import com.example.tech9_survey.domain.Question;
import com.example.tech9_survey.domain.Survey;
import com.example.tech9_survey.domain.SurveyPrivacy;
import com.example.tech9_survey.domain.User;
import com.example.tech9_survey.service.AnswerService;
import com.example.tech9_survey.service.QuestionService;
import com.example.tech9_survey.service.SurveyService;
import com.example.tech9_survey.service.UserService;

@RestController
@RequestMapping("/api/survey")
public class SurveyController {
	
	private SurveyService surveyService;
	private UserService userService;
	private QuestionService questionService;
	private AnswerService answerService;
	
	@Autowired
	public SurveyController(SurveyService surveyService, UserService userService, QuestionService questionService, AnswerService answerService) {
		this.surveyService = surveyService;
		this.userService = userService;
		this.questionService = questionService;
		this.answerService = answerService;
	}

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@GetMapping
    public ResponseEntity<List<Survey>> findAll() {
    	List<Survey> surveys = surveyService.findAll();	
    	
    	if(surveys.isEmpty()) {
    		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    	}
    	
        return new ResponseEntity<>(surveys, HttpStatus.OK);
    }
	
	@GetMapping(path = "/{hashedId}")
	public ResponseEntity<Survey> findByHashedId(@PathVariable String hashedId) {
		Survey survey = surveyService.findByHashedId(hashedId);	
		
		if(survey == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		surveyIsActiveCheck(survey);
		return new ResponseEntity<>(survey, HttpStatus.OK);
	}
	
	@GetMapping(path = "/{id}/comment")
	public ResponseEntity<List<Comment>> findAllCommentsFromSurvey(@PathVariable Long id) {
		Survey survey = surveyService.findOne(id);
		
		if (survey == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }		
		
		List<Comment> comments = survey.getComments();
		
		if(comments.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<>(comments, HttpStatus.OK);
	}
  
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@PostMapping
    public ResponseEntity<Survey> save(@RequestBody Survey survey) {
		User user = userService.getLoggedInUser();
		
		if(user == null) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		
		survey.setCreator(user.getUsername());
		survey.setCreationDate(new Date());
		
    	try {
			survey.generateHash();
		} catch (NoSuchAlgorithmException e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}  
    	
		Survey duplicateSurvey = surveyService.findByHashedId(survey.getHashedId());	
		
		if(duplicateSurvey != null) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
		
		survey.setPublicationDate(null);
		survey.setExpirationDate(null);
		survey.setExitMessage(new String());
		survey.setIsActive(false);
		SurveyPrivacy surveyPrivacy = new SurveyPrivacy();
		surveyPrivacy.setType(SurveyPrivacy.SurveyPrivacyType.VISIBILITY_ALL);
		surveyPrivacy.setId(1L);
		survey.setSurveyPrivacy(surveyPrivacy);
		Survey createdSurvey = surveyService.save(survey);
		
    	return new ResponseEntity<>(createdSurvey, HttpStatus.CREATED);
    }
	
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@PutMapping
    public ResponseEntity<Survey> update(@RequestBody Survey survey) {
		Survey findSurvey = surveyService.findByHashedId(survey.getHashedId());
		
		if(findSurvey == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		List<Question> questions = survey.getQuestions();
		
		if(!questions.isEmpty()) {
			for(int i = 0; i < questions.size(); i++) {
				Question question = questions.get(i);
				question.setSurvey(survey);
				Question savedQuestion = questionService.save(question);

				List<Answer> answers = questions.get(i).getAnswers();
				
				if(!answers.isEmpty()) {
					for(int j = 0; j < answers.size(); j++) {
						Answer answer = answers.get(j);
						answer.setQuestion(savedQuestion);
						Answer savedAnswer = answerService.save(answer);
						answers.set(j, savedAnswer);
					}
					
					savedQuestion.setAnswers(answers);
				}
				
				questions.set(i, savedQuestion);
			}
			
			survey.setQuestions(questions);
		}
		
    	Survey updatedSurvey = surveyService.save(survey);
    	
    	return new ResponseEntity<>(updatedSurvey, HttpStatus.OK);
    }
	
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@DeleteMapping(path = "/{id}")
	public ResponseEntity<Survey> delete(@PathVariable Long id) {
		Survey findSurvey = surveyService.findOne(id);
		
		if(findSurvey == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		surveyService.delete(id);
		
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	private Survey surveyIsActiveCheck(Survey survey) {
		Date currentDate = new Date();
		
		if(survey.getIsActive() == false && survey.getPublicationDate() != null && survey.getPublicationDate().compareTo(currentDate) <= 0) {
			survey.setIsActive(true);
			survey = surveyService.save(survey);
		}
		
		if(survey.getIsActive() == true && survey.getPublicationDate() != null && survey.getPublicationDate().compareTo(currentDate) > 0) {
			survey.setIsActive(false);
			survey = surveyService.save(survey);
		}
		
		if(survey.getIsActive() == true && survey.getExpirationDate() != null && survey.getExpirationDate().compareTo(currentDate) <= 0) {
			survey.setIsActive(false);
			survey = surveyService.save(survey);
		}
		
		return survey;
	}
}
