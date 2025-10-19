package com.uade.tpo.AsgardComics.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class FotoUploadRequest {
    
    @NotBlank(message = "El nombre de la foto es requerido")
    private String nombreFoto;
    
    @NotNull(message = "Los datos de la foto son requeridos")
    private byte[] fotoData;
    
    @NotBlank(message = "El tipo de contenido es requerido")
    private String contentType;
    
    // Constructors
    public FotoUploadRequest() {}
    
    // Getters and Setters
    public String getNombreFoto() {
        return nombreFoto;
    }
    
    public void setNombreFoto(String nombreFoto) {
        this.nombreFoto = nombreFoto;
    }
    
    public byte[] getFotoData() {
        return fotoData;
    }
    
    public void setFotoData(byte[] fotoData) {
        this.fotoData = fotoData;
    }
    
    public String getContentType() {
        return contentType;
    }
    
    public void setContentType(String contentType) {
        this.contentType = contentType;
    }
}