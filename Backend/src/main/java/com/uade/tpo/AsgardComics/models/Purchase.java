package com.uade.tpo.AsgardComics.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "purchases")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Purchase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties("purchases")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comic_id", nullable = false)
    @JsonIgnoreProperties("purchases")
    private Comic comic;

    private Integer quantity;

    // Usamos Double para simplicidad; cambia a BigDecimal si prefieres precisión financiera
    private Double totalPrice;

    private LocalDateTime purchaseDate;

    public Purchase() {}

    public Purchase(User user, Comic comic, Integer quantity, Double totalPrice) {
        this.user = user;
        this.comic = comic;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    }

    @PrePersist
    public void prePersist() {
        if (this.purchaseDate == null) this.purchaseDate = LocalDateTime.now();
    }

    // getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Comic getComic() { return comic; }
    public void setComic(Comic comic) { this.comic = comic; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }

    public LocalDateTime getPurchaseDate() { return purchaseDate; }
    public void setPurchaseDate(LocalDateTime purchaseDate) { this.purchaseDate = purchaseDate; }
}
