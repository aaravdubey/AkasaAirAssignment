package com.aarav.akasabackend.controller;

import com.aarav.akasabackend.dto.response.ProductResponse;
import com.aarav.akasabackend.model.Category;
import com.aarav.akasabackend.model.Product;
import com.aarav.akasabackend.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("products")
public class ProductController {

    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> findProducts(@RequestParam String email, @RequestParam String type, @RequestParam List<String> categories) {
        List<ProductResponse> products = productService.getProducts(email, type, categories);
        return ResponseEntity.ok().body(products);
    }

    @GetMapping("/categories")
    public ResponseEntity<?> findCategories() {
        List<Category> categories = productService.getCategories();
        return ResponseEntity.ok().body(categories);
    }
}
