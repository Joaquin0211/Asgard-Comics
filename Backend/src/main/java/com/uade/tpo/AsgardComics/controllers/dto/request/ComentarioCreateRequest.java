package com.uade.tpo.AsgardComics.controllers.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ComentarioCreateRequest {
    
    @NotNull(message = "El ID del usuario es requerido")
    private Long usuarioId;
    
    @NotNull(message = "El ID de la publicación es requerido")
    private Long publicacionId;
    
    @NotBlank(message = "El contenido del comentario es requerido")
    @Size(max = 500, message = "El comentario no puede exceder 500 caracteres")
    private String contenido;
    
    // Constructors
    public ComentarioCreateRequest() {}
    
    // Getters and Setters
    public Long getUsuarioId() {
        return usuarioId;
    }
    
    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }
    
    public Long getPublicacionId() {
        return publicacionId;
    }
    
    public void setPublicacionId(Long publicacionId) {
        this.publicacionId = publicacionId;
    }
    
    public String getContenido() {
        return contenido;
    }
    
    public void setContenido(String contenido) {
        this.contenido = contenido;
    }
}