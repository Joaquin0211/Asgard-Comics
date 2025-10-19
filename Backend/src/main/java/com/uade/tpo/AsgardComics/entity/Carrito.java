package com.uade.tpo.AsgardComics.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "cart_items")
public class Carrito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comic_id", nullable = false)
    private Comic comic;

    private Integer quantity;

    // Constructors
    public Carrito() {}

    public Carrito(User user, Comic comic, Integer quantity) {
        this.user = user;
        this.comic = comic;
        this.quantity = quantity;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Comic getComic() { return comic; }
    public void setComic(Comic comic) { this.comic = comic; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}
