package com.uade.tpo.AsgardComics.controllers.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class AddToCartRequest {
    
    @NotNull(message = "El ID del comic es requerido")
    private Long comicId;
    
    @NotNull(message = "La cantidad es requerida")
    @Positive(message = "La cantidad debe ser mayor a 0")
    private Integer quantity;
    
    // Constructors
    public AddToCartRequest() {}
    
    public AddToCartRequest(Long comicId, Integer quantity) {
        this.comicId = comicId;
        this.quantity = quantity;
    }
    
    // Getters and Setters
    public Long getComicId() {
        return comicId;
    }
    
    public void setComicId(Long comicId) {
        this.comicId = comicId;
    }
    
    public Integer getQuantity() {
        return quantity;
    }
    
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}