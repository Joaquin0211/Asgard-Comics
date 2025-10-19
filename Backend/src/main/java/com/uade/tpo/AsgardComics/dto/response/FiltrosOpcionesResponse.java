package com.uade.tpo.AsgardComics.dto.response;

import java.util.List;

public class FiltrosOpcionesResponse {
    
    private List<String> categorias;
    private List<String> usuarios;
    private List<String> estados;
    
    // Constructors
    public FiltrosOpcionesResponse() {}
    
    public FiltrosOpcionesResponse(List<String> categorias, List<String> usuarios, List<String> estados) {
        this.categorias = categorias;
        this.usuarios = usuarios;
        this.estados = estados;
    }
    
    // Getters and Setters
    public List<String> getCategorias() {
        return categorias;
    }
    
    public void setCategorias(List<String> categorias) {
        this.categorias = categorias;
    }
    
    public List<String> getUsuarios() {
        return usuarios;
    }
    
    public void setUsuarios(List<String> usuarios) {
        this.usuarios = usuarios;
    }
    
    public List<String> getEstados() {
        return estados;
    }
    
    public void setEstados(List<String> estados) {
        this.estados = estados;
    }
}