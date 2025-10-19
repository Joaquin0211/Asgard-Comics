package com.uade.tpo.AsgardComics.controllers.dto.response;

public class ImageResponse {
    
    private String url;
    private String filename;
    private Long size;
    private String contentType;
    private boolean uploaded;
    private String message;
    
    // Constructors
    public ImageResponse() {}
    
    public ImageResponse(String url, String filename, Long size, String contentType) {
        this.url = url;
        this.filename = filename;
        this.size = size;
        this.contentType = contentType;
        this.uploaded = true;
        this.message = "Imagen subida exitosamente";
    }
    
    // Getters and Setters
    public String getUrl() {
        return url;
    }
    
    public void setUrl(String url) {
        this.url = url;
    }
    
    public String getFilename() {
        return filename;
    }
    
    public void setFilename(String filename) {
        this.filename = filename;
    }
    
    public Long getSize() {
        return size;
    }
    
    public void setSize(Long size) {
        this.size = size;
    }
    
    public String getContentType() {
        return contentType;
    }
    
    public void setContentType(String contentType) {
        this.contentType = contentType;
    }
    
    public boolean isUploaded() {
        return uploaded;
    }
    
    public void setUploaded(boolean uploaded) {
        this.uploaded = uploaded;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
}