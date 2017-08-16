package com.example.tech9_survey.controller;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.tech9_survey.domain.Comment;
import com.example.tech9_survey.domain.Role;
import com.example.tech9_survey.domain.Survey;
import com.example.tech9_survey.domain.User;
import com.example.tech9_survey.service.CommentService;
import com.example.tech9_survey.service.SurveyService;
import com.example.tech9_survey.service.UserService;

@RestController
@RequestMapping("/comments")
public class CommentController {

	private CommentService commentService;
    private SurveyService surveyService;
    private UserService userService;
    
    public CommentController(CommentService commentService, SurveyService surveyService, UserService userService) {
        this.commentService = commentService;
        this.surveyService = surveyService;
        this.userService = userService;
    }
    
    @RequestMapping(path = "/{survey_id}", method = RequestMethod.POST)
    public ResponseEntity<Comment> save(@RequestBody Comment comment, @PathVariable("survey_id") Long surveyId) {
       User userPosting = userService.findByUsername(getLoggedUsername());
       Survey commentedSurvey = surveyService.findOne(surveyId);
       
       if (commentedSurvey.getUserId().equals(userPosting)) {
           return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
       }
       
       comment.setUser(userPosting);
       comment.setUpdateDate(new Date());
       commentedSurvey.getComments().add(comment);
       
       surveyService.save(commentedSurvey);
       
       return new ResponseEntity<>(HttpStatus.OK);
        }
    
    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity delete(@PathVariable Long id) {
    	Survey commentedSurvey = surveyService.findSurveyByCommentsId(id);
    	Comment commentToDelete = commentService.findOne(id);
    	User loggedUser = userService.findByUsername(getLoggedUsername());
    	Comment commentOnSurvey = new Comment();
    	
    	if (commentedSurvey == null || commentToDelete == null || loggedUser == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    	
    	if (commentToDelete.getUser().equals(loggedUser)) {
    		for (Comment c : commentedSurvey.getComments()) {
                if (commentToDelete.equals(c)) {
                    commentOnSurvey = c;
                }
            }
    		
    	commentedSurvey.getComments().remove(commentOnSurvey);

        commentService.delete(id);

        return new ResponseEntity(HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }
    		
    public String getLoggedUsername() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getName();
	}
}
