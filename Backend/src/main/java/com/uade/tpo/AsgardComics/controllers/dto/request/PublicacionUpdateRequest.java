package com.uade.tpo.AsgardComics.controllers.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class PublicacionUpdateRequest {
    
    @NotNull(message = "El ID de la publicación es requerido")
    private Long publicacionId;
    
    @NotBlank(message = "El título es requerido")
    @Size(max = 200, message = "El título no puede exceder 200 caracteres")
    private String titulo;
    
    @NotBlank(message = "El contenido es requerido")
    @Size(max = 2000, message = "El contenido no puede exceder 2000 caracteres")
    private String contenido;
    
    // Constructors
    public PublicacionUpdateRequest() {}
    
    // Getters and Setters
    public Long getPublicacionId() {
        return publicacionId;
    }
    
    public void setPublicacionId(Long publicacionId) {
        this.publicacionId = publicacionId;
    }
    
    public String getTitulo() {
        return titulo;
    }
    
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    
    public String getContenido() {
        return contenido;
    }
    
    public void setContenido(String contenido) {
        this.contenido = contenido;
    }
}