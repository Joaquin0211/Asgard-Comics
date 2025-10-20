package com.uade.tpo.AsgardComics.dto;

import java.util.List;

public class PaymentRequestDTO {
    private Long userId;
    private CustomerInfoDTO customerInfo;
    private PaymentInfoDTO paymentInfo;
    private List<CartItemDTO> items;
    private Double total;
    
    // Constructors
    public PaymentRequestDTO() {}
    
    public PaymentRequestDTO(Long userId, CustomerInfoDTO customerInfo, PaymentInfoDTO paymentInfo, 
                           List<CartItemDTO> items, Double total) {
        this.userId = userId;
        this.customerInfo = customerInfo;
        this.paymentInfo = paymentInfo;
        this.items = items;
        this.total = total;
    }
    
    // Getters and Setters
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public CustomerInfoDTO getCustomerInfo() {
        return customerInfo;
    }
    
    public void setCustomerInfo(CustomerInfoDTO customerInfo) {
        this.customerInfo = customerInfo;
    }
    
    public PaymentInfoDTO getPaymentInfo() {
        return paymentInfo;
    }
    
    public void setPaymentInfo(PaymentInfoDTO paymentInfo) {
        this.paymentInfo = paymentInfo;
    }
    
    public List<CartItemDTO> getItems() {
        return items;
    }
    
    public void setItems(List<CartItemDTO> items) {
        this.items = items;
    }
    
    public Double getTotal() {
        return total;
    }
    
    public void setTotal(Double total) {
        this.total = total;
    }
}