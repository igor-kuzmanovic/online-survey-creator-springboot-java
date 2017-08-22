package com.example.tech9_survey.controller;

import com.example.tech9_survey.domain.User;
import com.example.tech9_survey.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Paths;

@Controller
@RequestMapping("/upload")
public class UploadController {

    private UserService userService;

    public UploadController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    @ResponseBody
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") MultipartFile uploadfile) {
        String filepath;
        try {
            // Get the filename and build the local file path (be sure that the
            // application have write permissions on such directory)
            String filename = uploadfile.getOriginalFilename();
            String directory = "D:\\New folder\\tech9_survey\\src\\main\\resources\\static\\user_images";
            filepath = Paths.get(directory, filename).toString();

            // Save the file locally
            BufferedOutputStream stream =
                    new BufferedOutputStream(new FileOutputStream(new File(filepath)));
            stream.write(uploadfile.getBytes());
            stream.close();
            User loggedUser = userService.getLoggedInUser();
            String[] parts = filepath.split("user_images");
            String path = parts[1];
            loggedUser.setImageUrl(null);
            loggedUser.setImageUrl(path);
            userService.save(loggedUser);
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
