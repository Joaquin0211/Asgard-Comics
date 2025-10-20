package com.uade.tpo.AsgardComics.dto;

public class PaymentInfoDTO {
    private String cardNumber;
    private String expiryDate;
    private String cvv;
    private String cardName;
    
    // Constructors
    public PaymentInfoDTO() {}
    
    public PaymentInfoDTO(String cardNumber, String expiryDate, String cvv, String cardName) {
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
        this.cvv = cvv;
        this.cardName = cardName;
    }
    
    // Getters and Setters
    public String getCardNumber() {
        return cardNumber;
    }
    
    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }
    
    public String getExpiryDate() {
        return expiryDate;
    }
    
    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }
    
    public String getCvv() {
        return cvv;
    }
    
    public void setCvv(String cvv) {
        this.cvv = cvv;
    }
    
    public String getCardName() {
        return cardName;
    }
    
    public void setCardName(String cardName) {
        this.cardName = cardName;
    }
    
    // Método para obtener los últimos 4 dígitos de la tarjeta
    public String getLastFourDigits() {
        if (cardNumber != null && cardNumber.length() >= 4) {
            return cardNumber.substring(cardNumber.length() - 4);
        }
        return "";
    }
    
    // Método para determinar la marca de la tarjeta (simplificado)
    public String getCardBrand() {
        if (cardNumber == null || cardNumber.isEmpty()) {
            return "UNKNOWN";
        }
        
        String cleanNumber = cardNumber.replaceAll("\\s", "");
        
        if (cleanNumber.startsWith("4")) {
            return "VISA";
        } else if (cleanNumber.startsWith("5") || cleanNumber.startsWith("2")) {
            return "MASTERCARD";
        } else if (cleanNumber.startsWith("3")) {
            return "AMEX";
        } else {
            return "OTHER";
        }
    }
}