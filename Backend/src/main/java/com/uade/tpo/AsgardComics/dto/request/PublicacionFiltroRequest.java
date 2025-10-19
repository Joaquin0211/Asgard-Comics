package com.uade.tpo.AsgardComics.dto.request;

import jakarta.validation.constraints.Size;

public class PublicacionFiltroRequest {
    
    private String titulo;
    
    private Long categoriaId;
    
    private Long autorId;
    
    private String fechaDesde;
    
    private String fechaHasta;
    
    private String estado;
    
    @Size(max = 100, message = "La búsqueda no puede exceder 100 caracteres")
    private String busqueda;
    
    // Constructors
    public PublicacionFiltroRequest() {}
    
    // Getters and Setters
    public String getTitulo() {
        return titulo;
    }
    
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    
    public Long getCategoriaId() {
        return categoriaId;
    }
    
    public void setCategoriaId(Long categoriaId) {
        this.categoriaId = categoriaId;
    }
    
    public Long getAutorId() {
        return autorId;
    }
    
    public void setAutorId(Long autorId) {
        this.autorId = autorId;
    }
    
    public String getFechaDesde() {
        return fechaDesde;
    }
    
    public void setFechaDesde(String fechaDesde) {
        this.fechaDesde = fechaDesde;
    }
    
    public String getFechaHasta() {
        return fechaHasta;
    }
    
    public void setFechaHasta(String fechaHasta) {
        this.fechaHasta = fechaHasta;
    }
    
    public String getEstado() {
        return estado;
    }
    
    public void setEstado(String estado) {
        this.estado = estado;
    }
    
    public String getBusqueda() {
        return busqueda;
    }
    
    public void setBusqueda(String busqueda) {
        this.busqueda = busqueda;
    }
}