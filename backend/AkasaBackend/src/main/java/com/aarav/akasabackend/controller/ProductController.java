package com.aarav.akasabackend.controller;

import com.aarav.akasabackend.model.Product;
import com.aarav.akasabackend.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("product")
public class ProductController {

    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<?> findProducts(@RequestParam String category) {
        List<Product> products = productService.getProducts(category);
        return ResponseEntity.ok(products);
    }
}
