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

import com.example.tech9_survey.domain.Notification;
import com.example.tech9_survey.domain.User;
import com.example.tech9_survey.service.NotificationService;
import com.example.tech9_survey.service.UserService;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
	
	private NotificationService notificationService;
	private UserService userService;
	
	public NotificationController(NotificationService notificationService, UserService userService) {
		this.notificationService = notificationService;
		this.userService = userService;
	}
	
	// Unused
	@GetMapping
	public ResponseEntity<List<Notification>> findAll() {
		List<Notification> allNotifications = notificationService.findAll(); 
		return new ResponseEntity<>(allNotifications, HttpStatus.OK);
	}
	
	// Unused
	@GetMapping(path = "/{id}")
	public ResponseEntity<Notification> findOne(@PathVariable Long id) {
		Notification notification = notificationService.findOne(id);
		return new ResponseEntity<>(notification, HttpStatus.OK);
	}
	
	// Unused
	@PostMapping(path = "/{userId}")
	public ResponseEntity<Object> save(@PathVariable Long userId, @RequestBody Notification notification) throws NoSuchAlgorithmException {
		User sender = userService.getLoggedInUser();
		sender.getNotifications().add(notification);
		userService.save(sender);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@DeleteMapping
	public ResponseEntity<Object> delete(@PathVariable Long notificationId) {
		notificationService.delete(notificationId);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
