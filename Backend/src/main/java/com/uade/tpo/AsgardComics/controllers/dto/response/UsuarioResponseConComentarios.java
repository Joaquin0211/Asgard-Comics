package com.uade.tpo.AsgardComics.controllers.dto.response;

import java.time.LocalDateTime;
import java.util.List;

public class UsuarioResponseConComentarios {
    
    private Long id;
    private String nombre;
    private String email;
    private String bio;
    private String fotoPerfil;
    private String rol;
    private LocalDateTime fechaRegistro;
    private int cantidadPublicaciones;
    private int cantidadSeguidores;
    private int cantidadSiguiendo;
    private boolean siguiendo;
    private List<ComentarioResponse> comentarios;
    
    // Constructors
    public UsuarioResponseConComentarios() {}
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
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
    
    public String getRol() {
        return rol;
    }
    
    public void setRol(String rol) {
        this.rol = rol;
    }
    
    public LocalDateTime getFechaRegistro() {
        return fechaRegistro;
    }
    
    public void setFechaRegistro(LocalDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }
    
    public int getCantidadPublicaciones() {
        return cantidadPublicaciones;
    }
    
    public void setCantidadPublicaciones(int cantidadPublicaciones) {
        this.cantidadPublicaciones = cantidadPublicaciones;
    }
    
    public int getCantidadSeguidores() {
        return cantidadSeguidores;
    }
    
    public void setCantidadSeguidores(int cantidadSeguidores) {
        this.cantidadSeguidores = cantidadSeguidores;
    }
    
    public int getCantidadSiguiendo() {
        return cantidadSiguiendo;
    }
    
    public void setCantidadSiguiendo(int cantidadSiguiendo) {
        this.cantidadSiguiendo = cantidadSiguiendo;
    }
    
    public boolean isSiguiendo() {
        return siguiendo;
    }
    
    public void setSiguiendo(boolean siguiendo) {
        this.siguiendo = siguiendo;
    }
    
    public List<ComentarioResponse> getComentarios() {
        return comentarios;
    }
    
    public void setComentarios(List<ComentarioResponse> comentarios) {
        this.comentarios = comentarios;
    }
}