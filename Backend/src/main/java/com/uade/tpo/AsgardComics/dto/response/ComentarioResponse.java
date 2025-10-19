package com.uade.tpo.AsgardComics.dto.response;

import java.time.LocalDateTime;
import java.util.List;

public class ComentarioResponse {
    
    private Long id;
    private String texto;
    private LocalDateTime fechaCreacion;
    private Long usuarioId;
    private String usuarioNombre;
    private String usuarioFotoPerfil;
    private Long publicacionId;
    private Long comentarioPadreId;
    private List<ComentarioResponse> respuestas;
    private int cantidadRespuestas;
    
    // Constructors
    public ComentarioResponse() {}
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTexto() {
        return texto;
    }
    
    public void setTexto(String texto) {
        this.texto = texto;
    }
    
    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }
    
    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
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
    
    public Long getPublicacionId() {
        return publicacionId;
    }
    
    public void setPublicacionId(Long publicacionId) {
        this.publicacionId = publicacionId;
    }
    
    public Long getComentarioPadreId() {
        return comentarioPadreId;
    }
    
    public void setComentarioPadreId(Long comentarioPadreId) {
        this.comentarioPadreId = comentarioPadreId;
    }
    
    public List<ComentarioResponse> getRespuestas() {
        return respuestas;
    }
    
    public void setRespuestas(List<ComentarioResponse> respuestas) {
        this.respuestas = respuestas;
    }
    
    public int getCantidadRespuestas() {
        return cantidadRespuestas;
    }
    
    public void setCantidadRespuestas(int cantidadRespuestas) {
        this.cantidadRespuestas = cantidadRespuestas;
    }
}