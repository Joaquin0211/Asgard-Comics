package com.uade.tpo.AsgardComics.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AddFileRequest {
    
    @NotBlank(message = "El nombre del archivo es requerido")
    private String fileName;
    
    @NotBlank(message = "El tipo de archivo es requerido")  
    private String fileType;
    
    @NotNull(message = "El contenido del archivo es requerido")
    private byte[] fileContent;
    
    private String description;
    
    // Constructors
    public AddFileRequest() {}
    
    // Getters and Setters
    public String getFileName() {
        return fileName;
    }
    
    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
    
    public String getFileType() {
        return fileType;
    }
    
    public void setFileType(String fileType) {
        this.fileType = fileType;
    }
    
    public byte[] getFileContent() {
        return fileContent;
    }
    
    public void setFileContent(byte[] fileContent) {
        this.fileContent = fileContent;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
}