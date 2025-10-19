package com.uade.tpo.AsgardComics.controllers.dto.foto;

import jakarta.validation.constraints.NotNull;

public class FotoDeleteRequest {
    
    @NotNull(message = "El ID de la foto es requerido")
    private Long fotoId;
    
    @NotNull(message = "El ID del usuario es requerido")
    private Long usuarioId;
    
    private String motivo;
    
    // Constructors
    public FotoDeleteRequest() {}
    
    public FotoDeleteRequest(Long fotoId, Long usuarioId) {
        this.fotoId = fotoId;
        this.usuarioId = usuarioId;
    }
    
    public FotoDeleteRequest(Long fotoId, Long usuarioId, String motivo) {
        this.fotoId = fotoId;
        this.usuarioId = usuarioId;
        this.motivo = motivo;
    }
    
    // Getters and Setters
    public Long getFotoId() {
        return fotoId;
    }
    
    public void setFotoId(Long fotoId) {
        this.fotoId = fotoId;
    }
    
    public Long getUsuarioId() {
        return usuarioId;
    }
    
    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }
    
    public String getMotivo() {
        return motivo;
    }
    
    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }
}