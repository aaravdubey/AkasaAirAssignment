package com.aarav.akasabackend.repo;

import com.aarav.akasabackend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Long> {
    public Category findByName(String name);
}
