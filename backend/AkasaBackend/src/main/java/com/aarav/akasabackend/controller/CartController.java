package com.aarav.akasabackend.controller;

import com.aarav.akasabackend.dto.request.AddToCartRequest;
import com.aarav.akasabackend.model.Cart;
import com.aarav.akasabackend.repo.CartRepo;
import com.aarav.akasabackend.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("cart")
public class CartController {

    private final CartService cartService;
    private final CartRepo cartRepo;

    public CartController(CartService cartService, CartRepo cartRepo) {
        this.cartService = cartService;
        this.cartRepo = cartRepo;
    }

    @PostMapping("/update")
    public ResponseEntity<Map<String, Object>> addProductToCart(@RequestBody AddToCartRequest request) {
//        System.out.println(request);
        Map<String, Object> response = cartService.updateCart(request.getEmail(), request.getProductId(), request.getQuantity(), request.getAction());
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Cart> getKart() {
        return ResponseEntity.ok().body(cartService.getCartByUser());
    }

}
