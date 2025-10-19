package com.uade.tpo.AsgardComics.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uade.tpo.AsgardComics.entity.User;

import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailAndPassword(String email, String password);
    Optional<User> findByEmail(String email);
    List<User> findByRole(String role);
}
