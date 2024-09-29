package com.aarav.akasabackend.dto.response;

import com.aarav.akasabackend.model.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductResponse {
    private Long id;
    private String name;
    private Category category;
    private String foodType;
    private Double price;
    private String description;
    private String imageUrl;
    private Integer availableQuantity;
    private Integer cartQuantity;
}
