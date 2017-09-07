package com.example.tech9_survey.controller;

import com.example.tech9_survey.domain.*;
import com.example.tech9_survey.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@EnableScheduling
@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;
    private CommentService commentService;
    private VerificationTokenService verificationTokenService;
    private JavaMailSender javaMailSender;
    private SurveyService surveyService;
    private ImageService imageService;

    @Autowired
    public UserController(UserService userService, VerificationTokenService verificationTokenService,
                          CommentService commentService, JavaMailSender javaMailSender,
                          SurveyService surveyService, ImageService imageService) {
        this.imageService = imageService;
        this.commentService = commentService;
        this.userService = userService;
        this.surveyService = surveyService;
        this.verificationTokenService = verificationTokenService;
        this.javaMailSender = javaMailSender;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public ResponseEntity<List<User>> findAll() {
        List<User> users = userService.findAll();

        if (users == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping(path = "/{id}")
    public ResponseEntity<User> findOne(@PathVariable("id") Long id) {
        User user = userService.findOne(id);

        if(user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    
    @GetMapping(path = "/{id}/notifications")
	public ResponseEntity<List<Notification>> findAllNotificationsFromUser(@PathVariable("id") Long id) {
		User user = userService.findOne(id);
		
		if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }		
		
		List<Notification> allNotifications = user.getNotifications();
		List<Notification> unreadNotifications = new ArrayList<Notification>();
		
		for(int i = 0; i < allNotifications.size(); i++) {
			Notification notification = allNotifications.get(i);
			unreadNotifications.add(notification);
			
			if(notification.getIsRead() == false) {
				notification.setIsRead(true);
				allNotifications.set(i, notification);
			}
		}
		
		if(unreadNotifications.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		
		user.setNotifications(allNotifications);
		userService.save(user);
		
		return new ResponseEntity<>(unreadNotifications, HttpStatus.OK);
	}

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable Long id) {
        User foundUser = userService.findOne(id);

        for (UserRole role : foundUser.getRoles()) {
            if (role.getType().equals(UserRole.RoleType.ROLE_ADMIN)) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        }

        for (Survey survey : surveyService.findAll()) {
            if (survey.getCreator().equals(foundUser.getUsername())) {
                surveyService.delete(survey.getId());
            }
        }

        commentService.deleteByUser(foundUser.getUsername());
        userService.delete(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(path = "/comment/survey/{id}")
    public ResponseEntity<List<User>> usersWithImage(@PathVariable("id") Long surveyId) {
        Survey survey = surveyService.findOne(surveyId);
        List<User> users = new ArrayList<>();

        List<Comment> comments = survey.getComments();

        for (Comment comment : comments) {
            if (users.contains(userService.findByUsername(comment.getPoster()))) {
                continue;
            }
            users.add(userService.findByUsername(comment.getPoster()));
        }

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Object> save(@RequestBody User user) {
        VerificationToken token = new VerificationToken();
        token.setToken(UUID.randomUUID().toString());

        if (userService.findByUsername(user.getUsername()) == null) {
            if (userService.findByEmail(user.getEmail()) == null) {
                user.setIsEnabled(false);
                user.setRegistrationDate(new Date());

                token.setUser(user);
                verificationTokenService.save(token);

                User savedUser = userService.save(user);

                Image defaultImage = imageService.findOne(1L);
                defaultImage.getUsers().add(savedUser);
                imageService.save(defaultImage);

                sendMail(user.getEmail(), "http://localhost:8080/api/users/activate/" + token.getToken());

                return new ResponseEntity<>(savedUser, HttpStatus.OK);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).contentType(MediaType.TEXT_PLAIN).body("email");
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).contentType(MediaType.TEXT_PLAIN).body("username");
        }
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @PutMapping
    public ResponseEntity<Object> editUser(@RequestBody User user) {
        User editedUser = userService.save(user);

        if (editedUser == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(editedUser, HttpStatus.OK);
    }

    @GetMapping(value = "/activate/{token}")
    public ResponseEntity<Object> activateAccount(@PathVariable("token") String token) {
        VerificationToken verificationToken = verificationTokenService.findByToken(token);

        if (verificationToken == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).contentType(MediaType.TEXT_PLAIN).body("Account already activated!");
        }

        User user = verificationToken.getUser();
        user.setIsEnabled(true);
        userService.save(user);
        verificationTokenService.delete(verificationToken.getId());

        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.TEXT_PLAIN).body("Account activated!");
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping(path = "/user/{username}")
    public ResponseEntity<User> findLoggedUser(@PathVariable("username") String username) {
        User loggedUser = userService.findByUsername(username);

        if (loggedUser == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(loggedUser, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping(path = "/block/{user_id}")
    public ResponseEntity<Object> changeStatus(@RequestBody String duration, @PathVariable("user_id") Long userId) {
        User foundUser = userService.findOne(userId);
        
        if (foundUser == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if(duration.equals("Permanent")) {
            foundUser.setBanDate(null);
        } else {
            foundUser.setBanDate(addDay(new Date(), Integer.parseInt(duration)));
        }

        foundUser.setUserStatus(resolveStatus(foundUser));

        for (UserRole role : foundUser.getRoles()) {
            if (role.getType().equals(UserRole.RoleType.ROLE_ADMIN)) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        }

        userService.save(foundUser);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping("/login")
    public User user(Authentication authentication) {
        User user = userService.findByUsername(authentication.getName());
        UserStatus userStatus = new UserStatus();

        if(user.getUserStatus().getType().equals(UserStatus.UserStatusType.STATUS_INACTIVE) && new Date().after(user.getBanDate())) {
            userStatus.setType(UserStatus.UserStatusType.STATUS_ACTIVE);
            userStatus.setId(1L);
            user.setUserStatus(userStatus);
            userService.save(user);
        }
        user.setPassword(null);

        return user;
    }

    @Scheduled(fixedDelay = 60000)
    public void scheduleFixedDelayTask() {
        for (VerificationToken t : verificationTokenService.findAll()) {
            if (addDay(t.getUser().getRegistrationDate(), 1).before(addDay(new Date(), 0)) && !t.getUser().getIsEnabled()) {
                verificationTokenService.delete(t.getId());
                userService.delete(t.getUser().getId());
            }
        }
    }

    private UserStatus resolveStatus(User foundUser) {
        UserStatus userStatus = new UserStatus();
        if (foundUser.getUserStatus().getType().equals(UserStatus.UserStatusType.STATUS_ACTIVE)) {
            userStatus.setType(UserStatus.UserStatusType.STATUS_INACTIVE);
            userStatus.setId(2L);
        } else {
            userStatus.setType(UserStatus.UserStatusType.STATUS_ACTIVE);
            userStatus.setId(1L);
        }
        return userStatus;
    }

    private Date addDay(Date date, int days)
    {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.DATE, days);
        return cal.getTime();
    }

    private void sendMail(String recipient, String activationLink) {
        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setTo(recipient);
        mail.setSubject("Account verification for tech9 survey");
        mail.setText("Click on this link to activate your account: " + activationLink + "\n \n" + "This is an automatically generated email, please do not reply!");

        javaMailSender.send(mail);
    }
}
