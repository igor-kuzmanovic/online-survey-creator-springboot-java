package com.example.tech9_survey.controller;

import java.util.Date;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tech9_survey.domain.Comment;
import com.example.tech9_survey.domain.Notification;
import com.example.tech9_survey.domain.Survey;
import com.example.tech9_survey.domain.User;
import com.example.tech9_survey.service.CommentService;
import com.example.tech9_survey.service.NotificationService;
import com.example.tech9_survey.service.SurveyService;
import com.example.tech9_survey.service.UserService;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
	
	private NotificationService notificationService;
	private UserService userService;
	private SurveyService surveyService;
	private CommentService commentService;
	
	public NotificationController(NotificationService notificationService, UserService userService, SurveyService surveyService, CommentService commentService) {
		this.notificationService = notificationService;
		this.userService = userService;
		this.surveyService = surveyService;
		this.commentService = commentService;
	}
	
	// UNUSED
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping
	public ResponseEntity<List<Notification>> findAll() {
		List<Notification> allNotifications = notificationService.findAll(); 
		return new ResponseEntity<>(allNotifications, HttpStatus.OK);
	}
	
	// UNUSED
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@GetMapping(path = "/{id}")
	public ResponseEntity<Notification> findOne(@PathVariable Long id) {
		Notification notification = notificationService.findOne(id);
		return new ResponseEntity<>(notification, HttpStatus.OK);
	}
	
	@PostMapping(path = "/survey/{surveyId}")
    public ResponseEntity<Notification> saveSurveySubmit(@PathVariable("surveyId") Long surveyId) {
        Survey completedSurvey = surveyService.findOne(surveyId);
        
        if(completedSurvey == null) {
        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
		
		User user = userService.getLoggedInUser();
        String sender = new String();
        
        if(user == null) {
        	sender = "anonymous";
        }
        else {
        	sender = user.getUsername();
        	
            if (completedSurvey.getCreator().equals(user.getUsername())) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
        }
        
        User receiver = userService.findByUsername(completedSurvey.getCreator());
        
        if(receiver == null) {
        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        Notification notification = new Notification();
        notification.setNotificationType(1);
        notification.setSender(sender);
        notification.setReceiver(receiver.getUsername());
        notification.setCreationDate(new Date());
        notification.setRead(false);
        notification.setLink("/survey/results/" + completedSurvey.getHashedId());
        
        notificationService.save(notification);
        receiver.getNotifications().add(notification);
        userService.save(receiver);
        
        return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping(path = "/report/survey/{surveyId}")
    public ResponseEntity<Notification> saveSurveyReport(@PathVariable("surveyId") Long surveyId) {
        Survey completedSurvey = surveyService.findOne(surveyId);
        
        if(completedSurvey == null) {
        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
		
		User user = userService.getLoggedInUser();
        String sender = new String();
        
        if(user == null) {
        	sender = "anonymous";
        }
        else {
        	sender = user.getUsername();
        	
            if (completedSurvey.getCreator().equals(user.getUsername())) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
        }
        
        User receiver = userService.findByUsername("admin");
        
        if(receiver == null) {
        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        Notification notification = new Notification();
        notification.setNotificationType(3);
        notification.setSender(sender);
        notification.setReceiver(receiver.getUsername());
        notification.setCreationDate(new Date());
        notification.setRead(false);
        notification.setLink("/admin/?" + completedSurvey.getId());
        
        notificationService.save(notification);
        receiver.getNotifications().add(notification);
        userService.save(receiver);
        
        return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping(path = "/comment/{commentId}")
    public ResponseEntity<Notification> saveCommentSubmit(@PathVariable("commentId") Long commentId) {
        Comment comment = commentService.findOne(commentId);
        
        if(comment == null) {
        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        User user = userService.getLoggedInUser();
        String sender = new String();
        
        if(user == null) {
        	sender = "anonymous";
        }
        else {
        	sender = user.getUsername();
        	
        	if (comment.getPoster().equals(user.getUsername())) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
        }
        
        Survey survey = surveyService.findSurveyByCommentsId(commentId);
        
        if(survey == null) {
        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        User receiver = userService.findByUsername(survey.getCreator());

        if(receiver == null) {
        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        Notification notification = new Notification();
        notification.setNotificationType(2);
        notification.setSender(sender);
        notification.setReceiver(receiver.getUsername());
        notification.setCreationDate(new Date());
        notification.setRead(false);    
        notification.setLink("/survey/results/" + survey.getHashedId() + "/?" + commentId);
        
        notificationService.save(notification);
        receiver.getNotifications().add(notification);
        userService.save(receiver);
        
        return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping(path = "/report/comment/{commentId}")
    public ResponseEntity<Notification> saveCommentReport(@PathVariable("commentId") Long commentId) {
        Comment comment = commentService.findOne(commentId);
        
        if(comment == null) {
        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        User user = userService.getLoggedInUser();
        String sender = new String();
        
        if(user == null) {
        	sender = "anonymous";
        }
        else {
        	sender = user.getUsername();
        	
        	if (comment.getPoster().equals(user.getUsername())) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
        }
        
        User receiver = userService.findByUsername("admin");

        if(receiver == null) {
        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        Notification notification = new Notification();
        notification.setNotificationType(4);
        notification.setSender(sender);
        notification.setReceiver(receiver.getUsername());
        notification.setCreationDate(new Date());
        notification.setRead(false);
        
        Survey survey = surveyService.findSurveyByCommentsId(commentId);
        
        if(survey == null) {
        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        notification.setLink("/admin/?" + commentId);
        
        notificationService.save(notification);
        receiver.getNotifications().add(notification);
        userService.save(receiver);
        
        return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@DeleteMapping
	public ResponseEntity<Object> delete(@PathVariable Long notificationId) {
		notificationService.delete(notificationId);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
