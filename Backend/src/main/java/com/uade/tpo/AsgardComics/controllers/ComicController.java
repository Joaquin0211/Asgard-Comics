package com.uade.tpo.AsgardComics.controllers;

import com.uade.tpo.AsgardComics.models.Comic;
import com.uade.tpo.AsgardComics.services.ComicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/comics")
@CrossOrigin(origins = "*")
public class ComicController {

    private final ComicService comicService;

    @Autowired
    public ComicController(ComicService comicService) {
        this.comicService = comicService;
    }

    @GetMapping
    public List<Comic> getAll() {
        return comicService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comic> getById(@PathVariable Long id) {
        Optional<Comic> c = comicService.findById(id);
        return c.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Comic> create(@RequestBody Comic comic) {
        Comic saved = comicService.save(comic);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comic> update(@PathVariable Long id, @RequestBody Comic comic) {
        Optional<Comic> updated = comicService.update(id, comic);
        return updated.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean deleted = comicService.deleteById(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}/stock")
    public ResponseEntity<Comic> adjustStock(@PathVariable Long id, @RequestParam int delta) {
        Optional<Comic> updated = comicService.adjustStock(id, delta);
        return updated.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}

