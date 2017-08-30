package com.example.tech9_survey.controller;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.tech9_survey.domain.Comment;
import com.example.tech9_survey.domain.Survey;
import com.example.tech9_survey.domain.User;
import com.example.tech9_survey.service.CommentService;
import com.example.tech9_survey.service.SurveyService;
import com.example.tech9_survey.service.UserService;

@RestController
@RequestMapping("/api/comment")
public class CommentController {

	private CommentService commentService;
	private UserService userService;
	private SurveyService surveyService;
    
    public CommentController(CommentService commentService, UserService userService, SurveyService surveyService) {
        this.commentService = commentService;
        this.userService = userService;
        this.surveyService = surveyService;
    }
    
    @GetMapping
    public ResponseEntity<List<Comment>> findAll() {
		List<Comment> allComments = commentService.findAll();
		return new ResponseEntity<>(allComments, HttpStatus.OK);
	}
    
    @GetMapping(path = "/{id}")
    public ResponseEntity<Comment> findOne(@PathVariable Long id) {
    	Comment comment = commentService.findOne(id);
		return new ResponseEntity<>(comment, HttpStatus.OK);
    }
    
    @PostMapping(path = "/{surveyId}")
    public ResponseEntity<Object> save(@PathVariable Long surveyId, @RequestBody Comment comment) throws NoSuchAlgorithmException {
    	Survey commentedSurvey = surveyService.findOne(surveyId);
	    User user = userService.getLoggedInUser();
	    
	    if(user == null) {
	    	comment.setPoster("anonymous");
	    }
	    else{
	    	comment.setPoster(user.getUsername());
	    }
	    
    	commentedSurvey.getComments().add(comment);
        surveyService.save(commentedSurvey);
        
    	return new ResponseEntity<>(HttpStatus.OK);

    }
    
    @DeleteMapping(path = "/{commentId}")
    public ResponseEntity<Object> delete(@PathVariable Long commentId) {
    	commentService.delete(commentId);
		return new ResponseEntity<>(HttpStatus.OK);
    }
}
