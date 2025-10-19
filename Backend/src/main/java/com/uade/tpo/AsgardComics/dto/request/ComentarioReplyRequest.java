package com.uade.tpo.AsgardComics.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ComentarioReplyRequest {
    
    @NotNull(message = "El ID del usuario es requerido")
    private Long usuarioId;
    
    @NotNull(message = "El ID del comentario padre es requerido")
    private Long comentarioPadreId;
    
    @NotBlank(message = "El contenido de la respuesta es requerido")
    @Size(max = 500, message = "La respuesta no puede exceder 500 caracteres")
    private String contenido;
    
    // Constructors
    public ComentarioReplyRequest() {}
    
    // Getters and Setters
    public Long getUsuarioId() {
        return usuarioId;
    }
    
    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }
    
    public Long getComentarioPadreId() {
        return comentarioPadreId;
    }
    
    public void setComentarioPadreId(Long comentarioPadreId) {
        this.comentarioPadreId = comentarioPadreId;
    }
    
    public String getContenido() {
        return contenido;
    }
    
    public void setContenido(String contenido) {
        this.contenido = contenido;
    }
}