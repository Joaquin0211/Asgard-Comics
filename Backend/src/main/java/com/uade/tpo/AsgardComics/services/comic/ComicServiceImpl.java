package com.uade.tpo.AsgardComics.services.comic;

import com.uade.tpo.AsgardComics.entity.Comic;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ComicServiceImpl {

    private final ComicService comicService;

    public ComicServiceImpl(ComicService comicService) {
        this.comicService = comicService;
    }

    /**
     * Busca comics por categoría o género
     */
    public List<Comic> findComicsByCategory(String category) {
        return comicService.findAll().stream()
                .filter(comic -> comic.getDescription() != null && 
                        comic.getDescription().toLowerCase().contains(category.toLowerCase()))
                .collect(Collectors.toList());
    }

    /**
     * Obtiene comics en oferta (precio menor a un valor específico)
     */
    public List<Comic> findComicsOnSale(Double maxPrice) {
        return comicService.findAll().stream()
                .filter(comic -> comic.getPrice() != null && comic.getPrice() <= maxPrice)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene comics con stock bajo
     */
    public List<Comic> findLowStockComics(int minStock) {
        return comicService.findAll().stream()
                .filter(comic -> comic.getStock() != null && comic.getStock() <= minStock)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene los comics más caros
     */
    public List<Comic> findTopPricedComics(int limit) {
        return comicService.findAll().stream()
                .filter(comic -> comic.getPrice() != null)
                .sorted((c1, c2) -> Double.compare(c2.getPrice(), c1.getPrice()))
                .limit(limit)
                .collect(Collectors.toList());
    }

    /**
     * Verifica si un comic necesita restock
     */
    public boolean needsRestock(Long comicId, int minStock) {
        return comicService.findById(comicId)
                .map(comic -> comic.getStock() == null || comic.getStock() <= minStock)
                .orElse(false);
    }

    /**
     * Obtiene estadísticas básicas del inventario de comics
     */
    public ComicStats getComicStats() {
        List<Comic> allComics = comicService.findAll();
        
        int totalComics = allComics.size();
        int inStock = (int) allComics.stream()
                .filter(comic -> comic.getStock() != null && comic.getStock() > 0)
                .count();
        int outOfStock = totalComics - inStock;
        
        double avgPrice = allComics.stream()
                .filter(comic -> comic.getPrice() != null)
                .mapToDouble(Comic::getPrice)
                .average()
                .orElse(0.0);
                
        return new ComicStats(totalComics, inStock, outOfStock, avgPrice);
    }

    // Clase interna para estadísticas
    public static class ComicStats {
        private final int totalComics;
        private final int inStock;
        private final int outOfStock;
        private final double averagePrice;

        public ComicStats(int totalComics, int inStock, int outOfStock, double averagePrice) {
            this.totalComics = totalComics;
            this.inStock = inStock;
            this.outOfStock = outOfStock;
            this.averagePrice = averagePrice;
        }

        // Getters
        public int getTotalComics() { return totalComics; }
        public int getInStock() { return inStock; }
        public int getOutOfStock() { return outOfStock; }
        public double getAveragePrice() { return averagePrice; }
    }
}