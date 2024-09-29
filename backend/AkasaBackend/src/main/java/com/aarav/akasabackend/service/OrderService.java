package com.aarav.akasabackend.service;

import com.aarav.akasabackend.model.*;
import com.aarav.akasabackend.repo.*;
import com.aarav.akasabackend.util.SecurityUtil;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final UserRepo userRepo;
    private final CartRepo cartRepo;
    private final OrderRepo orderRepo;
    private final ProductRepo productRepo;
    private final CartItemRepo cartItemRepo;

    public List<Order> getUserOrders() {
        UserDetails userDetails = SecurityUtil.getCurrentUserDetails();
        User user = userRepo.findByEmail(userDetails.getUsername());

        return orderRepo.findByUserOrderByCreatedAtDesc(user);
    }

    public OrderService(UserRepo userRepo, CartRepo cartRepo, OrderRepo orderRepo, ProductRepo productRepo, CartItemRepo cartItemRepo) {
        this.userRepo = userRepo;
        this.cartRepo = cartRepo;
        this.orderRepo = orderRepo;
        this.productRepo = productRepo;
        this.cartItemRepo = cartItemRepo;
    }

    @Transactional
    public long placeOrder(String method) {
        UserDetails userDetails = SecurityUtil.getCurrentUserDetails();
        User user = userRepo.findByEmail(userDetails.getUsername());
        Cart cart = cartRepo.findByUser(user);

        // Check stock availability
        for (CartItem cartItem : cart.getItems()) {
            Product product = cartItem.getProduct();
            System.out.println("XXX");
            System.out.println(cartItem.getQuantity() + " " + product.getAvailableQuantity());
            if (cartItem.getQuantity() > product.getAvailableQuantity()) {
                return 0;
            }
        }

        Order order = new Order();
        order.setUser(user);
        order.setTotalAmount(cart.getTotal());
        order.setOrderItems(createOrderItems(cart, order));
        order.setMethod(method);

//        System.out.println();
        orderRepo.save(order);

        updateProductQuantities(cart);

        clearCart(cart);

        return order.getId();
    }

    private List<OrderItem> createOrderItems(Cart cart, Order order) {
        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setOrder(order);
            orderItems.add(orderItem);
        }
        return orderItems;
    }

    private void updateProductQuantities(Cart cart) {
        for (CartItem cartItem : cart.getItems()) {
            Product product = cartItem.getProduct();
            product.setAvailableQuantity(product.getAvailableQuantity() - cartItem.getQuantity());
            productRepo.save(product);
        }
    }

    private void clearCart(Cart cart) {
        for (CartItem cartItem : cart.getItems()) {
            cartItemRepo.deleteById(cartItem.getId());
        }

        cart.getItems().clear();
        cart.setTotal(0.0);

        cartRepo.save(cart);
    }
}
