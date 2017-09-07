package com.example.tech9_survey.controller;

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

	@Autowired
    public CommentController(CommentService commentService, UserService userService, SurveyService surveyService) {
        this.commentService = commentService;
        this.userService = userService;
        this.surveyService = surveyService;
    }
    
    @GetMapping
    public ResponseEntity<List<Comment>> findAll() {
		List<Comment> comments = commentService.findAll();
		
		if(comments.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<>(comments, HttpStatus.OK);
	}
    
    // Unused
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    @GetMapping(path = "/{id}")
    public ResponseEntity<Comment> findOne(@PathVariable Long id) {
    	Comment comment = commentService.findOne(id);
		return new ResponseEntity<>(comment, HttpStatus.OK);
    }
    
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    @PostMapping(path = "/{surveyId}")
    public ResponseEntity<Object> save(@PathVariable Long surveyId, @RequestBody Comment comment) {
    	Survey survey = surveyService.findOne(surveyId);
		
		if(survey == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	    User user = userService.getLoggedInUser();
	    
	    if(user == null) {
	    	return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	    }
	    else{
	    	comment.setPoster(user.getUsername());
	    }

	    comment.setIsFlagged(false);
	    comment.setCreationDate(new Date());
    	survey.getComments().add(comment);
    	surveyService.save(survey);
        
    	return new ResponseEntity<>(HttpStatus.OK);

    }
    
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping(path = "/{commentId}")
    public ResponseEntity<Comment> allowComment(@PathVariable Long commentId) {
    	Comment comment = commentService.findOne(commentId);
    	
    	if(comment == null) {
    		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    	}
    	
    	comment.setIsFlagged(false);
    	commentService.save(comment);
    	
    	return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    @DeleteMapping(path = "/{commentId}")
    public ResponseEntity<Object> delete(@PathVariable Long commentId) {
    	Comment comment = commentService.findOne(commentId);
    	
    	if(comment == null) {
    		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    	}
    	
    	commentService.delete(commentId);
    	
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
