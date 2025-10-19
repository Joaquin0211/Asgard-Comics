// ...existing code...
package com.uade.tpo.AsgardComics.services;

import com.uade.tpo.AsgardComics.models.User;
import com.uade.tpo.AsgardComics.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    @Transactional
    public Optional<User> update(Long id, User user) {
        return userRepository.findById(id).map(existing -> {
            // Ajusta estos setters según tus campos reales
            existing.setName(user.getName());
            existing.setEmail(user.getEmail());
            existing.setPassword(user.getPassword());
            existing.setRole(user.getRole());
            return userRepository.save(existing);
        });
    }

    public boolean deleteById(Long id) {
        return userRepository.findById(id).map(u -> {
            userRepository.deleteById(id);
            return true;
        }).orElse(false);
    }

    public Optional<User> findByEmailAndPassword(String email, String password) {
        // Asume que UserRepository define findByEmailAndPassword
        return userRepository.findByEmailAndPassword(email, password);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
