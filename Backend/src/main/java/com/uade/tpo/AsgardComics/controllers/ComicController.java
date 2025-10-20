package com.uade.tpo.AsgardComics.controllers;

import com.uade.tpo.AsgardComics.entity.Comic;
import com.uade.tpo.AsgardComics.services.comic.ComicService;
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
    private final MerchandisingService merchandisingService;

    public ComicController(ComicService comicService, 
                          MerchandisingService merchandisingService) {
        this.comicService = comicService;
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
        // TODO: Implementar método findComicsOnSale en ComicService
        return comicService.findAll().stream()
            .filter(comic -> comic.getPrice() <= maxPrice)
            .toList();
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

    // ✨ NUEVO ENDPOINT: Buscar cómics por rango de precio
    @GetMapping("/price-range")
    public ResponseEntity<List<Comic>> getComicsByPriceRange(
            @RequestParam Double minPrice, 
            @RequestParam Double maxPrice) {
        try {
            List<Comic> comics = comicService.findAll().stream()
                .filter(comic -> comic.getPrice() >= minPrice && comic.getPrice() <= maxPrice)
                .toList();
            return ResponseEntity.ok(comics);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // ✨ NUEVO ENDPOINT: Obtener estadísticas de inventario
    @GetMapping("/stats")
    public ResponseEntity<InventoryStats> getInventoryStats() {
        try {
            List<Comic> allComics = comicService.findAll();
            
            InventoryStats stats = new InventoryStats();
            stats.setTotalComics(allComics.size());
            stats.setTotalStock(allComics.stream().mapToInt(Comic::getStock).sum());
            stats.setAveragePrice(allComics.stream().mapToDouble(Comic::getPrice).average().orElse(0.0));
            stats.setTotalValue(allComics.stream().mapToDouble(c -> c.getPrice() * c.getStock()).sum());
            
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // DTO para las estadísticas
    public static class InventoryStats {
        private int totalComics;
        private int totalStock;
        private double averagePrice;
        private double totalValue;

        // Getters y Setters
        public int getTotalComics() { return totalComics; }
        public void setTotalComics(int totalComics) { this.totalComics = totalComics; }
        
        public int getTotalStock() { return totalStock; }
        public void setTotalStock(int totalStock) { this.totalStock = totalStock; }
        
        public double getAveragePrice() { return averagePrice; }
        public void setAveragePrice(double averagePrice) { this.averagePrice = averagePrice; }
        
        public double getTotalValue() { return totalValue; }
        public void setTotalValue(double totalValue) { this.totalValue = totalValue; }
    }
}

