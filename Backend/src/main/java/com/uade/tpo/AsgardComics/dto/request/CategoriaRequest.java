package com.uade.tpo.AsgardComics.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CategoriaRequest {
    
    @NotBlank(message = "El nombre de la categoría es requerido")
    private String nombre;
    
    private String descripcion;
    
    @NotNull(message = "El estado activo es requerido")
    private Boolean activo;
    
    // Constructors
    public CategoriaRequest() {}
    
    // Getters and Setters
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public String getDescripcion() {
        return descripcion;
    }
    
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    
    public Boolean getActivo() {
        return activo;
    }
    
    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
}