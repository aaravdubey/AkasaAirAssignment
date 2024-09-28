package com.aarav.akasabackend.service;

import com.aarav.akasabackend.model.Category;
import com.aarav.akasabackend.model.Product;
import com.aarav.akasabackend.repo.CategoryRepo;
import com.aarav.akasabackend.repo.ProductRepo;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Service
public class ProductService {

    private final CategoryRepo categoryRepo;
    private ProductRepo productRepo;

    public ProductService(ProductRepo productRepo, CategoryRepo categoryRepo) {
        this.productRepo = productRepo;
        this.categoryRepo = categoryRepo;
    }

    public List<Product> getProducts(String category) {
        if (category == null)
            return productRepo.findAll();

        Category storedCategory = categoryRepo.findByName(category);
        return productRepo.findByCategory(storedCategory);
    }
}
