package com.uade.tpo.AsgardComics.controllers.dto.request;

import jakarta.validation.constraints.NotNull;

public class PublicacionEstadoRequest {
    
    @NotNull(message = "El ID de la publicación es requerido")
    private Long publicacionId;
    
    @NotNull(message = "El estado es requerido")
    private String estado;
    
    private String motivoCambio;
    
    // Constructors
    public PublicacionEstadoRequest() {}
    
    // Getters and Setters
    public Long getPublicacionId() {
        return publicacionId;
    }
    
    public void setPublicacionId(Long publicacionId) {
        this.publicacionId = publicacionId;
    }
    
    public String getEstado() {
        return estado;
    }
    
    public void setEstado(String estado) {
        this.estado = estado;
    }
    
    public String getMotivoCambio() {
        return motivoCambio;
    }
    
    public void setMotivoCambio(String motivoCambio) {
        this.motivoCambio = motivoCambio;
    }
}