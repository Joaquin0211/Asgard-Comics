package com.uade.tpo.AsgardComics.controllers.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CambioContrasenaRequest {
    
    @NotBlank(message = "La contraseña actual es requerida")
    private String contrasenaActual;
    
    @NotBlank(message = "La nueva contraseña es requerida")
    @Size(min = 6, message = "La nueva contraseña debe tener al menos 6 caracteres")
    private String nuevaContrasena;
    
    @NotBlank(message = "La confirmación de contraseña es requerida")
    private String confirmarContrasena;
    
    // Constructors
    public CambioContrasenaRequest() {}
    
    // Getters and Setters
    public String getContrasenaActual() {
        return contrasenaActual;
    }
    
    public void setContrasenaActual(String contrasenaActual) {
        this.contrasenaActual = contrasenaActual;
    }
    
    public String getNuevaContrasena() {
        return nuevaContrasena;
    }
    
    public void setNuevaContrasena(String nuevaContrasena) {
        this.nuevaContrasena = nuevaContrasena;
    }
    
    public String getConfirmarContrasena() {
        return confirmarContrasena;
    }
    
    public void setConfirmarContrasena(String confirmarContrasena) {
        this.confirmarContrasena = confirmarContrasena;
    }
}