package com.uade.tpo.AsgardComics.controllers.auth;

import com.uade.tpo.AsgardComics.controllers.dto.request.LoginRequest;
import com.uade.tpo.AsgardComics.controllers.dto.request.RegisterRequest;
import com.uade.tpo.AsgardComics.controllers.dto.response.ApiResponse;
import com.uade.tpo.AsgardComics.controllers.dto.response.AuthResponse;
import com.uade.tpo.AsgardComics.controllers.exceptions.BadRequestException;
import com.uade.tpo.AsgardComics.models.User;
import com.uade.tpo.AsgardComics.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v2/auth")
@CrossOrigin(origins = "*")
public class AuthControllerV2 {

    private final UserService userService;

    public AuthControllerV2(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@RequestBody RegisterRequest request) {
        try {
            // Verificar si el email ya existe
            if (userService.findByEmail(request.getEmail()).isPresent()) {
                throw new BadRequestException("El email ya está registrado");
            }

            // Crear nuevo usuario
            User user = new User();
            user.setName(request.getName());
            user.setEmail(request.getEmail());
            user.setPassword(request.getPassword()); // En producción, encriptar la contraseña
            user.setRole(request.getRole());

            User savedUser = userService.save(user);
            
            AuthResponse authResponse = new AuthResponse();
            authResponse.setUser(savedUser);
            authResponse.setMessage("Usuario registrado exitosamente");
            
            return ResponseEntity.ok(ApiResponse.success("Registro exitoso", authResponse));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Error en el registro: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody LoginRequest request) {
        try {
            Optional<User> userOpt = userService.findByEmailAndPassword(request.getEmail(), request.getPassword());
            
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                AuthResponse authResponse = new AuthResponse();
                authResponse.setUser(user);
                authResponse.setMessage("Login exitoso");
                
                return ResponseEntity.ok(ApiResponse.success("Login exitoso", authResponse));
            } else {
                return ResponseEntity.status(401)
                        .body(ApiResponse.error("Credenciales inválidas"));
            }
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Error en el login: " + e.getMessage()));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout() {
        // Aquí se podría invalidar tokens JWT si se implementara
        return ResponseEntity.ok(ApiResponse.success("Logout exitoso", "Usuario deslogueado"));
    }
}