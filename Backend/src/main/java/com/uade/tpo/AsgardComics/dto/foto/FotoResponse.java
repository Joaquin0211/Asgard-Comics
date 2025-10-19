package com.uade.tpo.AsgardComics.dto.foto;

import java.time.LocalDateTime;

public class FotoResponse {
    
    private Long id;
    private String filename;
    private String url;
    private String contentType;
    private Long size;
    private LocalDateTime uploadDate;
    private Long publicacionId;
    private String descripcion;
    private boolean procesado;
    
    // Constructors
    public FotoResponse() {}
    
    public FotoResponse(Long id, String filename, String url, String contentType, Long size) {
        this.id = id;
        this.filename = filename;
        this.url = url;
        this.contentType = contentType;
        this.size = size;
        this.uploadDate = LocalDateTime.now();
        this.procesado = true;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getFilename() {
        return filename;
    }
    
    public void setFilename(String filename) {
        this.filename = filename;
    }
    
    public String getUrl() {
        return url;
    }
    
    public void setUrl(String url) {
        this.url = url;
    }
    
    public String getContentType() {
        return contentType;
    }
    
    public void setContentType(String contentType) {
        this.contentType = contentType;
    }
    
    public Long getSize() {
        return size;
    }
    
    public void setSize(Long size) {
        this.size = size;
    }
    
    public LocalDateTime getUploadDate() {
        return uploadDate;
    }
    
    public void setUploadDate(LocalDateTime uploadDate) {
        this.uploadDate = uploadDate;
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
    
    public boolean isProcesado() {
        return procesado;
    }
    
    public void setProcesado(boolean procesado) {
        this.procesado = procesado;
    }
}