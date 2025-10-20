package com.uade.tpo.AsgardComics.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comic_id", nullable = false)
    private Comic comic;
    
    @Column(nullable = false)
    private Integer quantity;
    
    @Column(nullable = false)
    private Double unitPrice; // Precio al momento de la compra
    
    @Column(nullable = false)
    private Double totalPrice; // unitPrice * quantity
    
    // Información del producto al momento de la compra (para productos transformados)
    @Column
    private String productTitle;
    
    @Column
    private String productCategory;
    
    // Constructors
    public OrderItem() {}
    
    public OrderItem(Order order, Comic comic, Integer quantity, Double unitPrice) {
        this.order = order;
        this.comic = comic;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.totalPrice = unitPrice * quantity;
        this.productTitle = comic.getTitle(); // Por defecto usar el título del cómic
        this.productCategory = "comic"; // Por defecto categoría comic
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Order getOrder() {
        return order;
    }
    
    public void setOrder(Order order) {
        this.order = order;
    }
    
    public Comic getComic() {
        return comic;
    }
    
    public void setComic(Comic comic) {
        this.comic = comic;
    }
    
    public Integer getQuantity() {
        return quantity;
    }
    
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
        if (this.unitPrice != null) {
            this.totalPrice = this.unitPrice * quantity;
        }
    }
    
    public Double getUnitPrice() {
        return unitPrice;
    }
    
    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
        if (this.quantity != null) {
            this.totalPrice = unitPrice * this.quantity;
        }
    }
    
    public Double getTotalPrice() {
        return totalPrice;
    }
    
    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }
    
    public String getProductTitle() {
        return productTitle;
    }
    
    public void setProductTitle(String productTitle) {
        this.productTitle = productTitle;
    }
    
    public String getProductCategory() {
        return productCategory;
    }
    
    public void setProductCategory(String productCategory) {
        this.productCategory = productCategory;
    }
}