package com.example.tech9_survey.controller;

import com.example.tech9_survey.domain.User;
import com.example.tech9_survey.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<User>> findAll() {
        List<User> users = userService.findAll();

        if (users == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<User> save(@RequestBody User user) {
        User savedUser = userService.save(user);

        if (savedUser == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(savedUser, HttpStatus.OK);
    }

    @RequestMapping("/login")
    public Map<String, Object> user(Authentication authentication) {
        Map<String, Object> map = new LinkedHashMap<>();

        map.put("name", authentication.getName());
        map.put("roles", AuthorityUtils.authorityListToSet((authentication).getAuthorities()));

        return map;
    }
}
