package com.aarav.akasabackend.repo;

import com.aarav.akasabackend.model.Cart;
import com.aarav.akasabackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepo extends JpaRepository<Cart, Integer> {
    Cart findByUser(User user);
}
