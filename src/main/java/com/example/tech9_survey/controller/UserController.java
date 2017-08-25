package com.example.tech9_survey.controller;

import com.example.tech9_survey.domain.User;
import com.example.tech9_survey.domain.VerificationToken;
import com.example.tech9_survey.service.UserService;
import com.example.tech9_survey.service.VerificationTokenService;
import org.springframework.http.*;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.nio.file.Paths;
import java.util.*;

@EnableScheduling
@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;
    private VerificationTokenService verificationTokenService;
    private JavaMailSender javaMailSender;

    public UserController(UserService userService, VerificationTokenService verificationTokenService, JavaMailSender javaMailSender) {
        this.userService = userService;
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

    @PostMapping
    public ResponseEntity<Object> save(@RequestBody User user) {
        VerificationToken token = new VerificationToken();

        token.setToken(UUID.randomUUID().toString());

        if (userService.findByUsername(user.getUsername()) == null) {
            if (userService.findByEmail(user.getEmail()) == null) {
                String imagePath = Paths.get("D:\\user_images", "default_user.jpg").toString();

                user.setEnabled(false);
                user.setRegistrationDate(new Date());
                user.setImageUrl(imagePath);

                token.setUser(user);
                verificationTokenService.save(token);

                User savedUser = userService.save(user);

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
        user.setEnabled(true);
        userService.save(user);
        verificationTokenService.delete(verificationToken.getId());

        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.TEXT_PLAIN).body("Account activated!");
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping(path = "/{username}")
    public ResponseEntity<User> findLoggedUser(@PathVariable("username") String username) {
        User loggedUser = userService.findByUsername(username);

        if (loggedUser == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(loggedUser, HttpStatus.OK);
    }

    @PostMapping(path = "/captchaResponse/{response}")
    public ResponseEntity<Object> responseCaptcha(@PathVariable("response") String response) {
        HttpHeaders headers = new HttpHeaders();
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://www.google.com/recaptcha/api/siteverify";

        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> map= new LinkedMultiValueMap<>();
        map.add("secret", "6LfO0SwUAAAAAPHqyQ8FxQXRRedhdl58oCp-nNz4");
        map.add("response", response);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

        ResponseEntity<String> postResponse = restTemplate.postForEntity( url, request , String.class );

        if (postResponse.toString().contains("\"success\": true")) {
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping("/login")
    public User user(Authentication authentication) {
        User user = userService.findByUsername(authentication.getName());
        user.setPassword(null);

        return user;
    }

    @Scheduled(fixedDelay = 60000)
    public void scheduleFixedDelayTask() {
        for (VerificationToken t : verificationTokenService.findAll()) {
            if (addDay(t.getUser().getRegistrationDate(), 1).before(addDay(new Date(), 0)) && !t.getUser().isEnabled()) {
                verificationTokenService.delete(t.getId());
                userService.delete(t.getUser().getId());
            }
        }
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
