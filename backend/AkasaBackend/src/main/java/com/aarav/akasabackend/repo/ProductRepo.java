package com.aarav.akasabackend.repo;

import com.aarav.akasabackend.model.Category;
import com.aarav.akasabackend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {
    List<Product> findAllByFoodType(String foodType);
    List<Product> findAllByFoodTypeAndCategoryIn(String foodType, List<Category> categories);
    List<Product> findAllByNameContaining(String name);
    List<Product> findAllByCategoryIn(List<Category> categories);
}
