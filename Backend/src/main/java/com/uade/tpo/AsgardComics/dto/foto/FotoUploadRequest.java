package com.uade.tpo.AsgardComics.dto.foto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class FotoUploadRequest {
    
    @NotBlank(message = "El nombre del archivo es requerido")
    private String filename;
    
    @NotNull(message = "Los datos del archivo son requeridos")
    private byte[] fileData;
    
    private String contentType;
    
    @NotNull(message = "El ID de la publicación es requerido")
    private Long publicacionId;
    
    private String descripcion;
    
    // Constructors
    public FotoUploadRequest() {}
    
    public FotoUploadRequest(String filename, byte[] fileData, String contentType, Long publicacionId) {
        this.filename = filename;
        this.fileData = fileData;
        this.contentType = contentType;
        this.publicacionId = publicacionId;
    }
    
    // Getters and Setters
    public String getFilename() {
        return filename;
    }
    
    public void setFilename(String filename) {
        this.filename = filename;
    }
    
    public byte[] getFileData() {
        return fileData;
    }
    
    public void setFileData(byte[] fileData) {
        this.fileData = fileData;
    }
    
    public String getContentType() {
        return contentType;
    }
    
    public void setContentType(String contentType) {
        this.contentType = contentType;
    }
    
    public Long getPublicacionId() {
        return publicacionId;
    }
    
    public void setPublicacionId(Long publicacionId) {
        this.publicacionId = publicacionId;
    }
    
    public String getDescripcion() {
        return descripcion;
    }
    
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}