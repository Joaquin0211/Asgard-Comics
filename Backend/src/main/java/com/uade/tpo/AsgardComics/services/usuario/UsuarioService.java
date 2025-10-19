package com.uade.tpo.AsgardComics.services.usuario;

import com.uade.tpo.AsgardComics.entity.User;
import com.uade.tpo.AsgardComics.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UserRepository userRepository;

    public UsuarioService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> findByRole(String role) {
        return userRepository.findByRole(role);
    }

    public Optional<User> authenticate(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    @Transactional
    public Optional<User> update(Long id, User user) {
        return userRepository.findById(id).map(existing -> {
            existing.setName(user.getName());
            existing.setEmail(user.getEmail());
            existing.setRole(user.getRole());
            // No actualizar password aquí por seguridad
            return userRepository.save(existing);
        });
    }

    @Transactional
    public boolean updatePassword(Long id, String newPassword) {
        return userRepository.findById(id).map(user -> {
            user.setPassword(newPassword);
            userRepository.save(user);
            return true;
        }).orElse(false);
    }

    public boolean deleteById(Long id) {
        return userRepository.findById(id).map(user -> {
            userRepository.deleteById(id);
            return true;
        }).orElse(false);
    }

    public boolean existsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public List<User> findCustomers() {
        return userRepository.findByRole("CUSTOMER");
    }

    public List<User> findAdmins() {
        return userRepository.findByRole("ADMIN");
    }
}