package com.uade.tpo.AsgardComics.dto.response;

import java.time.LocalDateTime;
import java.util.List;

public class PublicacionResponseConComentarios {
    
    private Long id;
    private String titulo;
    private String descripcion;
    private String categoria;
    private String estado;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaModificacion;
    private Long usuarioId;
    private String usuarioNombre;
    private String usuarioFotoPerfil;
    private List<FotoResponse> fotos;
    private List<ComentarioResponse> comentarios;
    private int cantidadComentarios;
    
    // Constructors
    public PublicacionResponseConComentarios() {}
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitulo() {
        return titulo;
    }
    
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    
    public String getDescripcion() {
        return descripcion;
    }
    
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    
    public String getCategoria() {
        return categoria;
    }
    
    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
    
    public String getEstado() {
        return estado;
    }
    
    public void setEstado(String estado) {
        this.estado = estado;
    }
    
    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }
    
    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }
    
    public LocalDateTime getFechaModificacion() {
        return fechaModificacion;
    }
    
    public void setFechaModificacion(LocalDateTime fechaModificacion) {
        this.fechaModificacion = fechaModificacion;
    }
    
    public Long getUsuarioId() {
        return usuarioId;
    }
    
    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }
    
    public String getUsuarioNombre() {
        return usuarioNombre;
    }
    
    public void setUsuarioNombre(String usuarioNombre) {
        this.usuarioNombre = usuarioNombre;
    }
    
    public String getUsuarioFotoPerfil() {
        return usuarioFotoPerfil;
    }
    
    public void setUsuarioFotoPerfil(String usuarioFotoPerfil) {
        this.usuarioFotoPerfil = usuarioFotoPerfil;
    }
    
    public List<FotoResponse> getFotos() {
        return fotos;
    }
    
    public void setFotos(List<FotoResponse> fotos) {
        this.fotos = fotos;
    }
    
    public List<ComentarioResponse> getComentarios() {
        return comentarios;
    }
    
    public void setComentarios(List<ComentarioResponse> comentarios) {
        this.comentarios = comentarios;
    }
    
    public int getCantidadComentarios() {
        return cantidadComentarios;
    }
    
    public void setCantidadComentarios(int cantidadComentarios) {
        this.cantidadComentarios = cantidadComentarios;
    }
}