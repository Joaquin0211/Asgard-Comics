package com.uade.tpo.AsgardComics.controllers;

import com.uade.tpo.AsgardComics.entity.User;
import com.uade.tpo.AsgardComics.entity.Comic;
import com.uade.tpo.AsgardComics.services.usuario.UsuarioService;
import com.uade.tpo.AsgardComics.services.comic.ComicService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "*")
public class TestDataController {

    private final UsuarioService usuarioService;
    private final ComicService comicService;

    public TestDataController(UsuarioService usuarioService, ComicService comicService) {
        this.usuarioService = usuarioService;
        this.comicService = comicService;
    }

    @PostMapping("/create-sample-data")
    public ResponseEntity<String> createSampleData() {
        try {
            // Crear usuarios de prueba
            User admin = new User();
            admin.setName("Admin");
            admin.setEmail("admin@asgard.com");
            admin.setPassword("admin123"); // En producción debería estar hasheada
            admin.setRole("ADMIN");
            usuarioService.save(admin);

            User user1 = new User();
            user1.setName("Juan Pérez");
            user1.setEmail("juan@email.com");
            user1.setPassword("user123");
            user1.setRole("USER");
            usuarioService.save(user1);

            User user2 = new User();
            user2.setName("María García");
            user2.setEmail("maria@email.com");
            user2.setPassword("user123");
            user2.setRole("USER");
            usuarioService.save(user2);

            // Crear comics de prueba
            Comic comic1 = new Comic();
            comic1.setTitle("Spider-Man #1");
            comic1.setAuthor("Stan Lee");
            comic1.setDescription("El primer comic de Spider-Man");
            comic1.setPrice(25.99);
            comic1.setStock(10);
            comic1.setImageUrl("https://via.placeholder.com/300x400");
            comicService.save(comic1);

            Comic comic2 = new Comic();
            comic2.setTitle("Batman #1");
            comic2.setAuthor("Bob Kane");
            comic2.setDescription("El primer comic de Batman");
            comic2.setPrice(29.99);
            comic2.setStock(5);
            comic2.setImageUrl("https://via.placeholder.com/300x400");
            comicService.save(comic2);

            Comic comic3 = new Comic();
            comic3.setTitle("X-Men #1");
            comic3.setAuthor("Stan Lee");
            comic3.setDescription("El primer comic de X-Men");
            comic3.setPrice(22.99);
            comic3.setStock(8);
            comic3.setImageUrl("https://via.placeholder.com/300x400");
            comicService.save(comic3);

            return ResponseEntity.ok("Datos de prueba creados exitosamente!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creando datos: " + e.getMessage());
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = usuarioService.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/comics")
    public ResponseEntity<List<Comic>> getAllComics() {
        List<Comic> comics = comicService.findAll();
        return ResponseEntity.ok(comics);
    }
}