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
            // Verificar si ya existen datos
            if (usuarioService.findAll().size() > 0) {
                return ResponseEntity.ok("Los datos de prueba ya existen. Total usuarios: " + 
                    usuarioService.findAll().size() + ", Total cómics: " + comicService.findAll().size());
            }

            // Crear usuarios de prueba solo si no existen
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

            Comic comic4 = new Comic();
            comic4.setTitle("The Avengers #1");
            comic4.setAuthor("Stan Lee");
            comic4.setDescription("Los Vengadores se unen por primera vez");
            comic4.setPrice(35.50);
            comic4.setStock(12);
            comic4.setImageUrl("https://via.placeholder.com/300x400");
            comicService.save(comic4);

            Comic comic5 = new Comic();
            comic5.setTitle("Wonder Woman #1");
            comic5.setAuthor("William Moulton Marston");
            comic5.setDescription("La primera aparición de Wonder Woman");
            comic5.setPrice(18.75);
            comic5.setStock(6);
            comic5.setImageUrl("https://via.placeholder.com/300x400");
            comicService.save(comic5);

            Comic comic6 = new Comic();
            comic6.setTitle("Iron Man #1");
            comic6.setAuthor("Stan Lee");
            comic6.setDescription("El nacimiento del Hombre de Hierro");
            comic6.setPrice(42.99);
            comic6.setStock(4);
            comic6.setImageUrl("https://via.placeholder.com/300x400");
            comicService.save(comic6);

            Comic comic7 = new Comic();
            comic7.setTitle("Dragon Ball #1");
            comic7.setAuthor("Akira Toriyama");
            comic7.setDescription("El inicio de la saga de Goku");
            comic7.setPrice(15.99);
            comic7.setStock(20);
            comic7.setImageUrl("https://via.placeholder.com/300x400");
            comicService.save(comic7);

            Comic comic8 = new Comic();
            comic8.setTitle("One Piece #1");
            comic8.setAuthor("Eiichiro Oda");
            comic8.setDescription("La aventura de Luffy comienza");
            comic8.setPrice(12.50);
            comic8.setStock(25);
            comic8.setImageUrl("https://via.placeholder.com/300x400");
            comicService.save(comic8);

            return ResponseEntity.ok("Datos de prueba creados exitosamente! " +
                "Usuarios: " + usuarioService.findAll().size() + 
                ", Cómics: " + comicService.findAll().size());
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

    @DeleteMapping("/clear-all-data")
    public ResponseEntity<String> clearAllData() {
        try {
            return ResponseEntity.ok("Función de limpieza deshabilitada por seguridad. Reinicia la aplicación para limpiar la base de datos H2.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/status")
    public ResponseEntity<String> getDataStatus() {
        try {
            long userCount = usuarioService.findAll().size();
            long comicCount = comicService.findAll().size();
            
            return ResponseEntity.ok(String.format(
                "Estado de la base de datos: %d usuarios, %d cómics", 
                userCount, comicCount
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error obteniendo estado: " + e.getMessage());
        }
    }
}