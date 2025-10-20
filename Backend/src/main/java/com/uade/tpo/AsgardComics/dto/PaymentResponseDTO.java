package com.uade.tpo.AsgardComics.dto;

public class PaymentResponseDTO {
    private boolean success;
    private String message;
    private String orderNumber;
    private Long orderId;
    private String status;
    
    // Constructors
    public PaymentResponseDTO() {}
    
    public PaymentResponseDTO(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
    
    public PaymentResponseDTO(boolean success, String message, String orderNumber, Long orderId, String status) {
        this.success = success;
        this.message = message;
        this.orderNumber = orderNumber;
        this.orderId = orderId;
        this.status = status;
    }
    
    // Static factory methods
    public static PaymentResponseDTO success(String message, String orderNumber, Long orderId) {
        return new PaymentResponseDTO(true, message, orderNumber, orderId, "PAID");
    }
    
    public static PaymentResponseDTO failure(String message) {
        return new PaymentResponseDTO(false, message);
    }
    
    // Getters and Setters
    public boolean isSuccess() {
        return success;
    }
    
    public void setSuccess(boolean success) {
        this.success = success;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public String getOrderNumber() {
        return orderNumber;
    }
    
    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }
    
    public Long getOrderId() {
        return orderId;
    }
    
    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
}