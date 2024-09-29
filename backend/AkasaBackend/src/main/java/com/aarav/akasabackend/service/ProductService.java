package com.aarav.akasabackend.service;

import com.aarav.akasabackend.dto.response.ProductResponse;
import com.aarav.akasabackend.model.*;
import com.aarav.akasabackend.repo.CartRepo;
import com.aarav.akasabackend.repo.CategoryRepo;
import com.aarav.akasabackend.repo.ProductRepo;
import com.aarav.akasabackend.repo.UserRepo;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final CategoryRepo categoryRepo;
    private final ProductRepo productRepo;
    private final UserRepo userRepo;
    private final CartRepo cartRepo;

    public ProductService(ProductRepo productRepo, CategoryRepo categoryRepo, UserRepo userRepo, CartRepo cartRepo) {
        this.productRepo = productRepo;
        this.categoryRepo = categoryRepo;
        this.userRepo = userRepo;
        this.cartRepo = cartRepo;
    }

    public List<ProductResponse> getProducts(String email, String type, List<String> categories) {
        List<Product> products;
        User user = userRepo.findByEmail(email);
        Cart userCart = cartRepo.findByUser(user);

        if (categories == null || categories.isEmpty()) {
            products = (type.equals("All"))
                    ? productRepo.findAll()
                    : productRepo.findAllByFoodType(type);
        } else {
            List<Category> storedCategories = categoryRepo.findAllByNameIn(categories);
            products = (type.equals("All"))
                    ? productRepo.findAllByCategoryIn(storedCategories)
                    : productRepo.findAllByFoodTypeAndCategoryIn(type, storedCategories);
        }

        return products.stream().map(product -> {
            int cartQuantity = userCart.getItems().stream()
                    .filter(item -> item.getProduct().getId().equals(product.getId()))
                    .map(CartItem::getQuantity)
                    .findFirst()
                    .orElse(0);

            return new ProductResponse(
                    product.getId(),
                    product.getName(),
                    product.getCategory(),
                    product.getFoodType(),
                    product.getPrice(),
                    product.getDescription(),
                    product.getImageUrl(),
                    product.getAvailableQuantity(),
                    cartQuantity
            );
        }).collect(Collectors.toList());
    }

    public List<Category> getCategories() {
        return categoryRepo.findAll();
    }
}
