package com.uade.tpo.AsgardComics.controllers;

import com.uade.tpo.AsgardComics.entity.User;
import com.uade.tpo.AsgardComics.services.usuario.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UsuarioService usuarioService;

    public AuthController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email y password son requeridos"));
        }

        Optional<User> userOpt = usuarioService.findByEmail(email);
        
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Usuario no encontrado"));
        }

        User user = userOpt.get();
        
        // Verificación simple de password (en producción debería ser hasheado)
        if (!password.equals(user.getPassword())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Password incorrecto"));
        }

        // Login exitoso
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Login exitoso");
        response.put("user", Map.of(
            "id", user.getId(),
            "name", user.getName(),
            "email", user.getEmail(),
            "role", user.getRole()
        ));
        response.put("token", "simple-token-" + user.getId()); // Token simple para demo

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody Map<String, String> registerRequest) {
        String name = registerRequest.get("name");
        String email = registerRequest.get("email");
        String password = registerRequest.get("password");

        if (name == null || email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Todos los campos son requeridos"));
        }

        // Verificar si el usuario ya existe
        if (usuarioService.findByEmail(email).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "El email ya está registrado"));
        }

        // Crear nuevo usuario
        User newUser = new User();
        newUser.setName(name);
        newUser.setEmail(email);
        newUser.setPassword(password); // En producción debería estar hasheado
        newUser.setRole("USER");

        User savedUser = usuarioService.save(newUser);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Usuario registrado exitosamente");
        response.put("user", Map.of(
            "id", savedUser.getId(),
            "name", savedUser.getName(),
            "email", savedUser.getEmail(),
            "role", savedUser.getRole()
        ));

        return ResponseEntity.ok(response);
    }

    @GetMapping("/validate")
    public ResponseEntity<Map<String, Object>> validateToken(@RequestHeader("Authorization") String token) {
        // Validación simple del token
        if (token != null && token.startsWith("simple-token-")) {
            String userIdStr = token.replace("simple-token-", "");
            try {
                Long userId = Long.parseLong(userIdStr);
                Optional<User> userOpt = usuarioService.findById(userId);
                
                if (userOpt.isPresent()) {
                    User user = userOpt.get();
                    return ResponseEntity.ok(Map.of(
                        "valid", true,
                        "user", Map.of(
                            "id", user.getId(),
                            "name", user.getName(),
                            "email", user.getEmail(),
                            "role", user.getRole()
                        )
                    ));
                }
            } catch (NumberFormatException e) {
                // Token inválido
            }
        }
        
        return ResponseEntity.badRequest().body(Map.of("valid", false, "error", "Token inválido"));
    }
}