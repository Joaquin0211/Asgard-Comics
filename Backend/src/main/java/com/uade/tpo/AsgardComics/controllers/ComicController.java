package com.uade.tpo.AsgardComics.controllers;

import com.uade.tpo.AsgardComics.entity.Comic;
import com.uade.tpo.AsgardComics.services.comic.ComicService;
import com.uade.tpo.AsgardComics.services.comic.ComicServiceImpl;
import com.uade.tpo.AsgardComics.services.merchandising.MerchandisingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/comics")
@CrossOrigin(origins = "*")
public class ComicController {

    private final ComicService comicService;
    private final ComicServiceImpl comicServiceImpl;
    private final MerchandisingService merchandisingService;

    public ComicController(ComicService comicService, 
                          ComicServiceImpl comicServiceImpl,
                          MerchandisingService merchandisingService) {
        this.comicService = comicService;
        this.comicServiceImpl = comicServiceImpl;
        this.merchandisingService = merchandisingService;
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

    // Búsqueda por título
    @GetMapping("/search/title")
    public List<Comic> searchByTitle(@RequestParam String title) {
        return comicService.findByTitle(title);
    }

    // Búsqueda por autor
    @GetMapping("/search/author")
    public List<Comic> searchByAuthor(@RequestParam String author) {
        return comicService.findByAuthor(author);
    }

    // Comics más vendidos
    @GetMapping("/bestsellers")
    public List<Comic> getBestSellers(@RequestParam(defaultValue = "10") int limit) {
        return merchandisingService.getBestSellingComics(limit);
    }

    // Comics recomendados
    @GetMapping("/recommended")
    public List<Comic> getRecommended(@RequestParam(defaultValue = "5") int limit) {
        return merchandisingService.getRecommendedComics(limit);
    }

    // Comics en oferta
    @GetMapping("/sale")
    public List<Comic> getOnSale(@RequestParam Double maxPrice) {
        return comicServiceImpl.findComicsOnSale(maxPrice);
    }

    // Comics nuevos
    @GetMapping("/new")
    public List<Comic> getNewComics(@RequestParam(defaultValue = "8") int limit) {
        return merchandisingService.getNewComics(limit);
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

