package com.uade.tpo.AsgardComics.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ComentarioUpdateTextoRequest {
    
    @NotNull(message = "El ID del comentario es requerido")
    private Long comentarioId;
    
    @NotBlank(message = "El nuevo contenido es requerido")
    @Size(max = 500, message = "El comentario no puede exceder 500 caracteres")
    private String nuevoContenido;
    
    // Constructors
    public ComentarioUpdateTextoRequest() {}
    
    // Getters and Setters
    public Long getComentarioId() {
        return comentarioId;
    }
    
    public void setComentarioId(Long comentarioId) {
        this.comentarioId = comentarioId;
    }
    
    public String getNuevoContenido() {
        return nuevoContenido;
    }
    
    public void setNuevoContenido(String nuevoContenido) {
        this.nuevoContenido = nuevoContenido;
    }
}