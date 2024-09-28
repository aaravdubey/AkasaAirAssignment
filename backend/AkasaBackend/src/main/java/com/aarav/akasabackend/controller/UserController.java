package com.aarav.akasabackend.controller;

import com.aarav.akasabackend.model.User;
import com.aarav.akasabackend.repo.UserRepo;
import com.aarav.akasabackend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UserController {

    private final UserRepo userRepo;
    private UserService userService;

    public UserController(UserService userService, UserRepo userRepo) {
        this.userService = userService;
        this.userRepo = userRepo;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        userService.signup(user);
        return ResponseEntity.ok().build();
    }

    @PostMapping("signin")
    public ResponseEntity<?> signin(@RequestBody User user) {
        String jwt = userService.signin(user);
        User storedUser = userRepo.findByEmail(user.getUsername());

        if (jwt != null)
            return ResponseEntity.ok().body(Map.of("token", jwt,
                "email", user.getUsername(),
                "name", storedUser.getName()));

        return ResponseEntity.status(403).build();
    }
}
