package com.uade.tpo.AsgardComics.services.merchandising;

import com.uade.tpo.AsgardComics.entity.Comic;
import com.uade.tpo.AsgardComics.entity.Purchase;
import com.uade.tpo.AsgardComics.services.comic.ComicService;
import com.uade.tpo.AsgardComics.services.compra.CompraService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MerchandisingService {

    private final ComicService comicService;
    private final CompraService compraService;

    public MerchandisingService(ComicService comicService, CompraService compraService) {
        this.comicService = comicService;
        this.compraService = compraService;
    }

    /**
     * Obtiene los comics más vendidos
     */
    public List<Comic> getBestSellingComics(int limit) {
        Map<Long, Long> salesCount = compraService.findAll().stream()
                .collect(Collectors.groupingBy(
                    purchase -> purchase.getComic().getId(),
                    Collectors.counting()
                ));

        return salesCount.entrySet().stream()
                .sorted(Map.Entry.<Long, Long>comparingByValue().reversed())
                .limit(limit)
                .map(entry -> comicService.findById(entry.getKey()))
                .filter(opt -> opt.isPresent())
                .map(opt -> opt.get())
                .collect(Collectors.toList());
    }

    /**
     * Obtiene comics recomendados basados en ventas
     */
    public List<Comic> getRecommendedComics(int limit) {
        return getBestSellingComics(limit);
    }

    /**
     * Obtiene comics con descuento (precio menor al promedio)
     */
    public List<Comic> getDiscountedComics() {
        List<Comic> allComics = comicService.findAll();
        double avgPrice = allComics.stream()
                .filter(comic -> comic.getPrice() != null)
                .mapToDouble(Comic::getPrice)
                .average()
                .orElse(0.0);

        return allComics.stream()
                .filter(comic -> comic.getPrice() != null && comic.getPrice() < avgPrice)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene comics nuevos (agregados recientemente)
     */
    public List<Comic> getNewComics(int limit) {
        return comicService.findAll().stream()
                .sorted((c1, c2) -> Long.compare(c2.getId(), c1.getId())) // Por ID descendente
                .limit(limit)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene comics por rango de precio
     */
    public List<Comic> getComicsByPriceRange(Double minPrice, Double maxPrice) {
        return comicService.findAll().stream()
                .filter(comic -> comic.getPrice() != null)
                .filter(comic -> comic.getPrice() >= minPrice && comic.getPrice() <= maxPrice)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene estadísticas de ventas
     */
    public SalesStats getSalesStats() {
        List<Purchase> allPurchases = compraService.findAll();
        
        int totalSales = allPurchases.size();
        Double totalRevenue = allPurchases.stream()
                .filter(purchase -> purchase.getTotalPrice() != null)
                .mapToDouble(Purchase::getTotalPrice)
                .sum();
        
        Integer totalQuantitySold = allPurchases.stream()
                .filter(purchase -> purchase.getQuantity() != null)
                .mapToInt(Purchase::getQuantity)
                .sum();
        
        Double avgOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0.0;
        
        return new SalesStats(totalSales, totalRevenue, totalQuantitySold, avgOrderValue);
    }

    /**
     * Crea ofertas especiales automáticamente
     */
    public List<Comic> createSpecialOffers() {
        // Comics con stock alto que necesitan promoción
        return comicService.findAll().stream()
                .filter(comic -> comic.getStock() != null && comic.getStock() > 20)
                .limit(10)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene comics relacionados por autor
     */
    public List<Comic> getRelatedComicsByAuthor(Long comicId, int limit) {
        return comicService.findById(comicId)
                .map(comic -> comicService.findByAuthor(comic.getAuthor()).stream()
                        .filter(c -> !c.getId().equals(comicId))
                        .limit(limit)
                        .collect(Collectors.toList()))
                .orElse(List.of());
    }

    // Clase para estadísticas de ventas
    public static class SalesStats {
        private final int totalSales;
        private final Double totalRevenue;
        private final Integer totalQuantitySold;
        private final Double averageOrderValue;

        public SalesStats(int totalSales, Double totalRevenue, 
                         Integer totalQuantitySold, Double averageOrderValue) {
            this.totalSales = totalSales;
            this.totalRevenue = totalRevenue;
            this.totalQuantitySold = totalQuantitySold;
            this.averageOrderValue = averageOrderValue;
        }

        // Getters
        public int getTotalSales() { return totalSales; }
        public Double getTotalRevenue() { return totalRevenue; }
        public Integer getTotalQuantitySold() { return totalQuantitySold; }
        public Double getAverageOrderValue() { return averageOrderValue; }
    }
}