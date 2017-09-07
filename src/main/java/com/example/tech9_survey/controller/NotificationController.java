package com.example.tech9_survey.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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
	private JavaMailSender javaMailSender;

	@Autowired
	public NotificationController(NotificationService notificationService, UserService userService, SurveyService surveyService, CommentService commentService, JavaMailSender javaMailSender) {
		this.notificationService = notificationService;
		this.userService = userService;
		this.surveyService = surveyService;
		this.commentService = commentService;
		this.javaMailSender = javaMailSender;
	}
	
	// UNUSED
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping
	public ResponseEntity<List<Notification>> findAll() {
		List<Notification> allNotifications = notificationService.findAll(); 
		return new ResponseEntity<>(allNotifications, HttpStatus.OK);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@GetMapping(path = "/user/{id}")
	public ResponseEntity<List<Notification>> findAllByUser() {
		User user = userService.getLoggedInUser();
		
		if(user == null) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		
		List<Notification> notifications = user.getNotifications();
		
    	if(notifications.isEmpty()) {
    		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    	}
		
		return new ResponseEntity<>(notifications, HttpStatus.OK);
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
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
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
        notification.setIsRead(false);
        notification.setLink("/survey/results/" + completedSurvey.getHashedId());
        notification.setContent(notification.getSender() + " has successfully completed your survey '" + completedSurvey.getName() + "'.\n\nhttp://localhost:8080/#" + notification.getLink());
        
        notificationService.save(notification);
        receiver.getNotifications().add(notification);
        userService.save(receiver);
        
    	if(receiver.isNotifyByEmail() == true) {
    		notifyByEmail(receiver, notification);
    	}
        
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
        	
            if (completedSurvey.getCreator().equals(user.getUsername()) || user.getUsername().equals("admin")) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
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
        notification.setIsRead(false);
        notification.setLink("/admin");
        notification.setContent(notification.getSender() + " has reported the survey '" + completedSurvey.getName() + "'.\n\nhttp://localhost:8080/#" + notification.getLink());
        
        completedSurvey.setIsFlagged(true); 
        surveyService.save(completedSurvey);
        
        notificationService.save(notification);
        receiver.getNotifications().add(notification);
        userService.save(receiver);
        
        if(receiver.isNotifyByEmail() == true) {
    		notifyByEmail(receiver, notification);
    	}
        
        return new ResponseEntity<>(HttpStatus.OK);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@PostMapping(path = "/comment/{commentId}")
    public ResponseEntity<Notification> saveCommentSubmit(@PathVariable("commentId") Long commentId) {
        Comment comment = commentService.findOne(commentId);
        
        if(comment == null) {
        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
        User user = userService.getLoggedInUser();
        String sender = new String();
        Survey survey = surveyService.findSurveyByCommentsId(commentId);
        
        if(user == null) {
        	sender = "anonymous";
        }
        else {
        	sender = user.getUsername();
        	
        	if (survey.getCreator().equals(user.getUsername())) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        }
        
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
        notification.setIsRead(false);    
        notification.setLink("/survey/results/" + survey.getHashedId() + "/" + commentId);
        notification.setContent(notification.getSender() + " has commented '" + comment.getContent() + "' on your survey '" + survey.getName() + "'.\n\nhttp://localhost:8080/#" + notification.getLink());
        
        notificationService.save(notification);
        receiver.getNotifications().add(notification);
        userService.save(receiver);
        
        if(receiver.isNotifyByEmail() == true) {
     		notifyByEmail(receiver, notification);
     	}
        
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
        Survey survey = surveyService.findSurveyByCommentsId(commentId);
        
        if(user == null) {
        	sender = "anonymous";
        }
        else {
        	sender = user.getUsername();
        	
        	if (comment.getPoster().equals(user.getUsername()) || user.getUsername().equals("admin")) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        }
        
        if(survey == null) {
        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
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
        notification.setIsRead(false);
        notification.setLink("/admin");
        notification.setContent(notification.getSender() + " has reported the comment '" + comment.getContent() + "' on the survey '" + survey.getName() + "'.\n\nhttp://localhost:8080/#" + notification.getLink()); 
        
        comment.setIsFlagged(true);
        commentService.save(comment);
        
        notificationService.save(notification);
        receiver.getNotifications().add(notification);
        userService.save(receiver);
        
        if(receiver.isNotifyByEmail() == true) {
     		notifyByEmail(receiver, notification);
     	}
        
        return new ResponseEntity<>(HttpStatus.OK);
	}
	
	//UNUSED
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	@DeleteMapping
	public ResponseEntity<Object> delete(@PathVariable Long notificationId) {
		notificationService.delete(notificationId);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	private void notifyByEmail(User user, Notification notification) {		
        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setTo(user.getEmail());
        mail.setSubject("Tech9 Survey | " + notification.getReceiver() + " | Notification");
        mail.setText(notification.getContent());

		javaMailSender.send(mail);
	}

}
