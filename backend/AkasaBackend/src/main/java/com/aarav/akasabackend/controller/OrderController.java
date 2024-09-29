package com.aarav.akasabackend.controller;

import com.aarav.akasabackend.model.Order;
import com.aarav.akasabackend.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("order")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public List<Order> getOrders() {
        return orderService.getUserOrders();
    }

    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody String method) {
        long id = orderService.placeOrder(method);
        if (id == 0)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok().body(id);
    }
}
