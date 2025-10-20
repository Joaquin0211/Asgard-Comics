package com.uade.tpo.AsgardComics.dto;

public class CartItemDTO {
    private Long id;
    private ComicDTO comic;
    private Integer quantity;

    // Constructors
    public CartItemDTO() {}

    public CartItemDTO(Long id, ComicDTO comic, Integer quantity) {
        this.id = id;
        this.comic = comic;
        this.quantity = quantity;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public ComicDTO getComic() { return comic; }
    public void setComic(ComicDTO comic) { this.comic = comic; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}