package com.uade.tpo.AsgardComics.controllers.dto.auth;

public class AuthenticationResponse {
    
    private String token;
    private String refreshToken;
    private String tokenType = "Bearer";
    private Long expiresIn;
    private boolean authenticated;
    private String message;
    
    // Constructors
    public AuthenticationResponse() {}
    
    public AuthenticationResponse(String token, String refreshToken, Long expiresIn) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.expiresIn = expiresIn;
        this.authenticated = true;
        this.message = "Autenticación exitosa";
    }
    
    // Static factory methods
    public static AuthenticationResponse success(String token, String refreshToken, Long expiresIn) {
        return new AuthenticationResponse(token, refreshToken, expiresIn);
    }
    
    public static AuthenticationResponse failure(String message) {
        AuthenticationResponse response = new AuthenticationResponse();
        response.setAuthenticated(false);
        response.setMessage(message);
        return response;
    }
    
    // Getters and Setters
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public String getRefreshToken() {
        return refreshToken;
    }
    
    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
    
    public String getTokenType() {
        return tokenType;
    }
    
    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }
    
    public Long getExpiresIn() {
        return expiresIn;
    }
    
    public void setExpiresIn(Long expiresIn) {
        this.expiresIn = expiresIn;
    }
    
    public boolean isAuthenticated() {
        return authenticated;
    }
    
    public void setAuthenticated(boolean authenticated) {
        this.authenticated = authenticated;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
}