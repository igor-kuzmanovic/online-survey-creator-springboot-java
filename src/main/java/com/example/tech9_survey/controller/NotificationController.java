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
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping
	public ResponseEntity<List<Notification>> findAll() {
		List<Notification> allNotifications = notificationService.findAll(); 
		return new ResponseEntity<>(allNotifications, HttpStatus.OK);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@GetMapping(path = "/{id}")
	public ResponseEntity<Notification> findOne(@PathVariable Long id) {
		Notification notification = notificationService.findOne(id);
		return new ResponseEntity<>(notification, HttpStatus.OK);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@PostMapping(path = "/survey/{surveyId}")
    public ResponseEntity<Notification> save(@PathVariable("surveyId") Long surveyId, @RequestBody Notification notification) {
        User sender = userService.getLoggedInUser();
        Survey completedSurvey = surveyService.findOne(surveyId);
        User receiver = userService.findByUsername(completedSurvey.getCreator());

        if (completedSurvey.getCreator().equals(sender.getUsername())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        notification.setSender(sender.getUsername());
        notification.setReceiver(receiver.getUsername());
        notification.setCreationDate(new Date());
        
        notificationService.save(notification);
        receiver.getNotifications().add(notification);
        userService.save(receiver);
        
        return new ResponseEntity<>(HttpStatus.OK);
	}
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@PostMapping(path = "/comment/{commentId}")
    public ResponseEntity<Notification> save1(@PathVariable("commentId") Long commentId, @RequestBody Notification notification) {
        User sender = userService.getLoggedInUser();
        Comment comment = commentService.findOne(commentId);
        User receiver = userService.findByUsername(comment.getPoster());

        if (comment.getPoster().equals(sender.getUsername())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        notification.setSender(sender.getUsername());
        notification.setReceiver(receiver.getUsername());
        notification.setCreationDate(new Date());
        
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
