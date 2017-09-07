package com.example.tech9_survey.controller;

import com.example.tech9_survey.domain.Image;
import com.example.tech9_survey.domain.User;
import com.example.tech9_survey.service.ImageService;
import com.example.tech9_survey.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/image")
public class ImageController {

    private ImageService imageService;
    private UserService userService;

    @Autowired
    public ImageController(ImageService imageService, UserService userService) {
        this.imageService = imageService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<Image>> findAll() {
        List<Image> allImages = imageService.findAll();

        if (allImages == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(allImages, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Image> findOne(@PathVariable("id") Long id) {
        Image image = imageService.findOne(id);

        if (image == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(image, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Image> save(@RequestBody Image image) {
        Image savedImage = imageService.save(image);

        if (savedImage == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(savedImage, HttpStatus.OK);
    }

    @PostMapping("/upload")
    @ResponseBody
    public ResponseEntity<Object> uploadFile(@RequestParam("file") MultipartFile uploadFile) {
        try {
            String filename = uploadFile.getOriginalFilename();
            String directory = "D:\\user_images";
            String filePath = Paths.get(directory, filename).toString();

            Image image = imageService.findByUrl(filePath);
            User user = userService.getLoggedInUser();

            if (image == null) {
                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filePath)));
                stream.write(uploadFile.getBytes());
                stream.close();

                Image imageForSave = new Image();
                imageForSave.setUrl(filePath);
                List<User> users = new ArrayList<>();
                users.add(user);
                imageForSave.setUsers(users);
                imageService.save(imageForSave);
                return new ResponseEntity<>(imageForSave, HttpStatus.OK);
            }

            image.getUsers().add(user);
            imageService.save(image);

            return new ResponseEntity<>(image, HttpStatus.OK);
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/all")
    public @ResponseBody Map<String, byte[]> getFile()  {
        List<Image> allImages = imageService.findAll();
        Map<String, byte[]> map = new HashMap<>();

        try {
            for (Image image : allImages) {
                for (User user : image.getUsers()) {
                    String filePath = Paths.get(image.getUrl()).toString();
                    InputStream is = new FileInputStream(new File(filePath));
                    BufferedImage img = ImageIO.read(is);
                    ByteArrayOutputStream bao = new ByteArrayOutputStream();
                    ImageIO.write(img, "jpg", bao);

                    map.put(user.getUsername(), bao.toByteArray());
                }
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return map;
    }

}
