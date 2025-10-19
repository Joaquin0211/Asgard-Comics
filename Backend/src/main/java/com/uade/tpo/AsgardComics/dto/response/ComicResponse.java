package com.uade.tpo.AsgardComics.dto.response;

import com.uade.tpo.AsgardComics.entity.Comic;

public class ComicResponse {
    
    private Long id;
    private String title;
    private String description;
    private Double price;
    private Integer stock;
    private String author;
    private String publisher;
    private String category;
    private String imageUrl;
    
    // Constructors
    public ComicResponse() {}
    
    public ComicResponse(Comic comic) {
        this.id = comic.getId();
        this.title = comic.getTitle();
        this.description = comic.getDescription();
        this.price = comic.getPrice();
        this.stock = comic.getStock();
        this.author = comic.getAuthor();
        this.imageUrl = comic.getImageUrl();
        // publisher y category no están en el modelo Comic
        this.publisher = null;
        this.category = null;
    }
    
    // Static factory method
    public static ComicResponse from(Comic comic) {
        return new ComicResponse(comic);
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public Double getPrice() {
        return price;
    }
    
    public void setPrice(Double price) {
        this.price = price;
    }
    
    public Integer getStock() {
        return stock;
    }
    
    public void setStock(Integer stock) {
        this.stock = stock;
    }
    
    public String getAuthor() {
        return author;
    }
    
    public void setAuthor(String author) {
        this.author = author;
    }
    
    public String getPublisher() {
        return publisher;
    }
    
    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
