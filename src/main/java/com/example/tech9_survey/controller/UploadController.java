package com.example.tech9_survey.controller;

import com.example.tech9_survey.domain.User;
import com.example.tech9_survey.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/upload")
public class UploadController {

    private UserService userService;

    public UploadController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    @ResponseBody
    public ResponseEntity<Object> uploadFile(@RequestParam("file") MultipartFile uploadFile) {
        try {
            User loggedUser = userService.getLoggedInUser();
            loggedUser.setImageUrl(null);
            loggedUser.setImageUrl(uploadFile.getBytes());
            userService.save(loggedUser);
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
