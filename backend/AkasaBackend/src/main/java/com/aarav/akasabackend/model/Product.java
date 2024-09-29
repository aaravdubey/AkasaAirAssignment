package com.aarav.akasabackend.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false)
    private String foodType;

    @Column(nullable = false)
    private Double price;

    private String description;

    private String imageUrl;

    @Column(nullable = false)
    private Integer availableQuantity;
}
