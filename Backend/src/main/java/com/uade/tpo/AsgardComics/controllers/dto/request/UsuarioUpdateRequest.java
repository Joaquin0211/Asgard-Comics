package com.uade.tpo.AsgardComics.controllers.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UsuarioUpdateRequest {
    
    @NotBlank(message = "El nombre es requerido")
    @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
    private String nombre;
    
    @Size(max = 500, message = "La bio no puede exceder 500 caracteres")
    private String bio;
    
    private String fotoPerfil;
    
    // Constructors
    public UsuarioUpdateRequest() {}
    
    // Getters and Setters
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public String getBio() {
        return bio;
    }
    
    public void setBio(String bio) {
        this.bio = bio;
    }
    
    public String getFotoPerfil() {
        return fotoPerfil;
    }
    
    public void setFotoPerfil(String fotoPerfil) {
        this.fotoPerfil = fotoPerfil;
    }
}