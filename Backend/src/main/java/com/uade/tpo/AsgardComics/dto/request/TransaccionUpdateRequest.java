package com.uade.tpo.AsgardComics.dto.request;

import jakarta.validation.constraints.NotNull;

public class TransaccionUpdateRequest {
    
    @NotNull(message = "El ID de la transacción es requerido")
    private Long transaccionId;
    
    @NotNull(message = "El nuevo estado es requerido")
    private String nuevoEstado;
    
    private String observaciones;
    
    // Constructors
    public TransaccionUpdateRequest() {}
    
    // Getters and Setters
    public Long getTransaccionId() {
        return transaccionId;
    }
    
    public void setTransaccionId(Long transaccionId) {
        this.transaccionId = transaccionId;
    }
    
    public String getNuevoEstado() {
        return nuevoEstado;
    }
    
    public void setNuevoEstado(String nuevoEstado) {
        this.nuevoEstado = nuevoEstado;
    }
    
    public String getObservaciones() {
        return observaciones;
    }
    
    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
}