package com.uade.tpo.AsgardComics.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class PublicacionCreateRequest {
    
    @NotNull(message = "El ID del usuario es requerido")
    private Long usuarioId;
    
    @NotBlank(message = "El título es requerido")
    @Size(max = 200, message = "El título no puede exceder 200 caracteres")
    private String titulo;
    
    @NotBlank(message = "El contenido es requerido")
    @Size(max = 2000, message = "El contenido no puede exceder 2000 caracteres")
    private String contenido;
    
    @NotNull(message = "El ID de la categoría es requerido")
    private Long categoriaId;
    
    // Constructors
    public PublicacionCreateRequest() {}
    
    // Getters and Setters
    public Long getUsuarioId() {
        return usuarioId;
    }
    
    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
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
    
    public Long getCategoriaId() {
        return categoriaId;
    }
    
    public void setCategoriaId(Long categoriaId) {
        this.categoriaId = categoriaId;
    }
}