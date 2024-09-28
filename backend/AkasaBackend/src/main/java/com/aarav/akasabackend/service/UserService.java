package com.aarav.akasabackend.service;

import com.aarav.akasabackend.config.JWTService;
import com.aarav.akasabackend.model.Cart;
import com.aarav.akasabackend.model.User;
import com.aarav.akasabackend.repo.CartRepo;
import com.aarav.akasabackend.repo.UserRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@Service
public class UserService {

    private final AuthenticationManager authenticationManager;
    private final CartRepo cartRepo;
    private UserRepo userRepo;
    private JWTService jwtService;
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);

    public UserService(UserRepo userRepo, AuthenticationManager authenticationManager, CartRepo cartRepo, JWTService jwtService) {
        this.userRepo = userRepo;
        this.authenticationManager = authenticationManager;
        this.cartRepo = cartRepo;
        this.jwtService = jwtService;
    }

    public void signup(@RequestBody User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepo.save(user);
//        System.out.println(user);

        Cart cart = new Cart();
        cart.setUser(user);
        cartRepo.save(cart);
    }

    public String signin(@RequestBody User user) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        if (authentication.isAuthenticated())
            return jwtService.generateToken(user.getUsername());
        else return null;
    }
}
