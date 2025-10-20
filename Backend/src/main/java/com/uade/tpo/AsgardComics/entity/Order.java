package com.uade.tpo.AsgardComics.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private Long userId;
    
    @Column(nullable = false)
    private String orderNumber;
    
    @Column(nullable = false)
    private Double totalAmount;
    
    @Column(nullable = false)
    private String status; // PENDING, PAID, SHIPPED, DELIVERED, CANCELLED
    
    @Column(nullable = false)
    private LocalDateTime createdAt;
    
    @Column
    private LocalDateTime paidAt;
    
    // Customer Information
    @Column(nullable = false)
    private String customerFirstName;
    
    @Column(nullable = false)
    private String customerLastName;
    
    @Column(nullable = false)
    private String customerEmail;
    
    @Column(nullable = false)
    private String customerPhone;
    
    @Column(nullable = false)
    private String customerAddress;
    
    @Column
    private String customerCity;
    
    @Column
    private String customerZipCode;
    
    // Payment Information (almacenada de forma segura)
    @Column(nullable = false)
    private String paymentMethod; // CREDIT_CARD, DEBIT_CARD, etc.
    
    @Column
    private String cardLastFour; // Últimos 4 dígitos de la tarjeta
    
    @Column
    private String cardBrand; // VISA, MASTERCARD, etc.
    
    // Relación con OrderItems
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems;
    
    // Constructors
    public Order() {}
    
    public Order(Long userId, String orderNumber, Double totalAmount, String status) {
        this.userId = userId;
        this.orderNumber = orderNumber;
        this.totalAmount = totalAmount;
        this.status = status;
        this.createdAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public String getOrderNumber() {
        return orderNumber;
    }
    
    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }
    
    public Double getTotalAmount() {
        return totalAmount;
    }
    
    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getPaidAt() {
        return paidAt;
    }
    
    public void setPaidAt(LocalDateTime paidAt) {
        this.paidAt = paidAt;
    }
    
    public String getCustomerFirstName() {
        return customerFirstName;
    }
    
    public void setCustomerFirstName(String customerFirstName) {
        this.customerFirstName = customerFirstName;
    }
    
    public String getCustomerLastName() {
        return customerLastName;
    }
    
    public void setCustomerLastName(String customerLastName) {
        this.customerLastName = customerLastName;
    }
    
    public String getCustomerEmail() {
        return customerEmail;
    }
    
    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }
    
    public String getCustomerPhone() {
        return customerPhone;
    }
    
    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }
    
    public String getCustomerAddress() {
        return customerAddress;
    }
    
    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }
    
    public String getCustomerCity() {
        return customerCity;
    }
    
    public void setCustomerCity(String customerCity) {
        this.customerCity = customerCity;
    }
    
    public String getCustomerZipCode() {
        return customerZipCode;
    }
    
    public void setCustomerZipCode(String customerZipCode) {
        this.customerZipCode = customerZipCode;
    }
    
    public String getPaymentMethod() {
        return paymentMethod;
    }
    
    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
    
    public String getCardLastFour() {
        return cardLastFour;
    }
    
    public void setCardLastFour(String cardLastFour) {
        this.cardLastFour = cardLastFour;
    }
    
    public String getCardBrand() {
        return cardBrand;
    }
    
    public void setCardBrand(String cardBrand) {
        this.cardBrand = cardBrand;
    }
    
    public List<OrderItem> getOrderItems() {
        return orderItems;
    }
    
    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }
}