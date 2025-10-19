package com.uade.tpo.AsgardComics.services.usuario;

import com.uade.tpo.AsgardComics.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioServiceImpl {

    private final UsuarioService usuarioService;

    public UsuarioServiceImpl(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    /**
     * Valida que el email tenga formato correcto
     */
    public boolean isValidEmail(String email) {
        return email != null && email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
    }

    /**
     * Valida que la contraseña tenga al menos cierta complejidad
     */
    public boolean isValidPassword(String password) {
        return password != null && password.length() >= 6;
    }

    /**
     * Obtiene usuarios activos (que no están eliminados)
     */
    public List<User> findActiveUsers() {
        return usuarioService.findAll().stream()
                .filter(user -> user.getId() != null) // Usuarios no eliminados
                .collect(Collectors.toList());
    }

    /**
     * Busca usuarios por nombre parcial
     */
    public List<User> findByNameContaining(String name) {
        return usuarioService.findAll().stream()
                .filter(user -> user.getName() != null && 
                        user.getName().toLowerCase().contains(name.toLowerCase()))
                .collect(Collectors.toList());
    }

    /**
     * Verifica si un usuario es administrador
     */
    public boolean isAdmin(Long userId) {
        return usuarioService.findById(userId)
                .map(user -> "ADMIN".equals(user.getRole()))
                .orElse(false);
    }

    /**
     * Verifica si un usuario es cliente
     */
    public boolean isCustomer(Long userId) {
        return usuarioService.findById(userId)
                .map(user -> "CUSTOMER".equals(user.getRole()))
                .orElse(false);
    }

    /**
     * Obtiene estadísticas de usuarios
     */
    public UserStats getUserStats() {
        List<User> allUsers = usuarioService.findAll();
        
        int totalUsers = allUsers.size();
        int admins = (int) allUsers.stream()
                .filter(user -> "ADMIN".equals(user.getRole()))
                .count();
        int customers = (int) allUsers.stream()
                .filter(user -> "CUSTOMER".equals(user.getRole()))
                .count();
                
        return new UserStats(totalUsers, admins, customers);
    }

    /**
     * Registra un nuevo usuario con validaciones
     */
    public User registerUser(String name, String email, String password, String role) {
        if (!isValidEmail(email)) {
            throw new IllegalArgumentException("Email inválido");
        }
        
        if (!isValidPassword(password)) {
            throw new IllegalArgumentException("Contraseña debe tener al menos 6 caracteres");
        }
        
        if (usuarioService.existsByEmail(email)) {
            throw new IllegalArgumentException("Email ya existe");
        }
        
        User newUser = new User();
        newUser.setName(name);
        newUser.setEmail(email);
        newUser.setPassword(password);
        newUser.setRole(role != null ? role : "CUSTOMER");
        
        return usuarioService.save(newUser);
    }

    // Clase interna para estadísticas
    public static class UserStats {
        private final int totalUsers;
        private final int admins;
        private final int customers;

        public UserStats(int totalUsers, int admins, int customers) {
            this.totalUsers = totalUsers;
            this.admins = admins;
            this.customers = customers;
        }

        // Getters
        public int getTotalUsers() { return totalUsers; }
        public int getAdmins() { return admins; }
        public int getCustomers() { return customers; }
    }
}