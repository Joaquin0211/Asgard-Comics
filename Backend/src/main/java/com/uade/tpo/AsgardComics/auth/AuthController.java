// ...existing code...
package com.uade.tpo.AsgardComics.auth;

import com.uade.tpo.AsgardComics.models.User;
import com.uade.tpo.AsgardComics.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User created = userService.save(user);
        return ResponseEntity.ok(created);
    }

    // ...existing code...
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        Optional<User> user = userService.findByEmailAndPassword(email, password);

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
// ...existing code...
}