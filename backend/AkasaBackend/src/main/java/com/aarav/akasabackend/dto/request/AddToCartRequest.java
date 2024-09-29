package com.aarav.akasabackend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AddToCartRequest {
    private String email;
    private Long productId;
    private int quantity;
    private String action;
}

