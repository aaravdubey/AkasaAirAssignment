package com.aarav.akasabackend.service;

import com.aarav.akasabackend.model.Cart;
import com.aarav.akasabackend.model.CartItem;
import com.aarav.akasabackend.model.Product;
import com.aarav.akasabackend.model.User;
import com.aarav.akasabackend.repo.CartItemRepo;
import com.aarav.akasabackend.repo.CartRepo;
import com.aarav.akasabackend.repo.ProductRepo;
import com.aarav.akasabackend.repo.UserRepo;
import com.aarav.akasabackend.util.SecurityUtil;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Map;


@Service
public class CartService {

    private CartRepo cartRepo;
    private ProductRepo productRepo;
    private CartItemRepo cartItemRepo;
    private UserRepo userRepo;

    public CartService(CartRepo cartRepo, ProductRepo productRepo, CartItemRepo cartItemRepo, UserRepo userRepo) {
        this.cartRepo = cartRepo;
        this.productRepo = productRepo;
        this.cartItemRepo = cartItemRepo;
        this.userRepo = userRepo;
    }

    public Map<String, Object> updateCart(String email, Long productId, int quantity, String action) {
        User user = userRepo.findByEmail(email);
        Cart cart = cartRepo.findByUser(user);
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem cartItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst()
                .orElse(null);

        if (action.equals("add")) {
            if (quantity > product.getAvailableQuantity())
                return Map.of("quantity", product.getAvailableQuantity(), "total", cart.getTotal());

            if (cartItem != null) {
                if (quantity > product.getAvailableQuantity())
                    return Map.of("quantity", product.getAvailableQuantity(), "total", cart.getTotal());

                cartItem.setQuantity(quantity);
            } else {
                cartItem = new CartItem(null, cart, product, quantity);
                cart.getItems().add(cartItem);
            }

        } else if (action.equals("remove")) {
            if (cartItem == null)
                return Map.of("quantity", 0, "total", cart.getTotal());

            if (quantity <= 0) {
                cart.getItems().remove(cartItem);
                cartItemRepo.delete(cartItem);
                return Map.of("quantity", 0, "total", cart.getTotal());
            }

            if (quantity < cartItem.getQuantity())
                cartItem.setQuantity(quantity);
            else {
                cart.getItems().remove(cartItem);
                cartItemRepo.delete(cartItem);
            }
        } else {
            throw new IllegalArgumentException("Invalid action: " + action);
        }

        updateCartTotal(cart);
        cartRepo.save(cart);
        return Map.of("quantity", cartItem.getQuantity(), "total", cart.getTotal());
    }

    private void updateCartTotal(Cart cart) {
        double total = 0;
        for (CartItem item : cart.getItems()) {
            total += item.getQuantity() * item.getProduct().getPrice();
        }
        cart.setTotal(total);
    }


    public Cart getCartByUser() {
        UserDetails userDetails = SecurityUtil.getCurrentUserDetails();
        User user = userRepo.findByEmail(userDetails.getUsername());

        return cartRepo.findByUser(user);
    }
}
