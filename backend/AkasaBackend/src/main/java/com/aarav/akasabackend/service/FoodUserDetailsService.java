package com.aarav.akasabackend.service;

import com.aarav.akasabackend.model.User;
import com.aarav.akasabackend.repo.UserRepo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class FoodUserDetailsService implements UserDetailsService {

    private UserRepo userRepo;

    public FoodUserDetailsService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(email);
        if (user == null) {
            System.out.println("User not found");
            throw new UsernameNotFoundException(email);
        }
        return user;
    }
}
