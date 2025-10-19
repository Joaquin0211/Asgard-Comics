package com.uade.tpo.AsgardComics.services.inventario;

import com.uade.tpo.AsgardComics.entity.Comic;
import com.uade.tpo.AsgardComics.services.comic.ComicService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class InventarioService {

    private final ComicService comicService;

    public InventarioService(ComicService comicService) {
        this.comicService = comicService;
    }

    /**
     * Obtiene todos los comics con stock bajo
     */
    public List<Comic> getLowStockComics(int threshold) {
        return comicService.findAll().stream()
                .filter(comic -> comic.getStock() != null && comic.getStock() <= threshold)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene comics sin stock
     */
    public List<Comic> getOutOfStockComics() {
        return comicService.findAll().stream()
                .filter(comic -> comic.getStock() == null || comic.getStock() == 0)
                .collect(Collectors.toList());
    }

    /**
     * Obtiene comics con stock suficiente
     */
    public List<Comic> getInStockComics(int minStock) {
        return comicService.findAll().stream()
                .filter(comic -> comic.getStock() != null && comic.getStock() >= minStock)
                .collect(Collectors.toList());
    }

    /**
     * Calcula el valor total del inventario
     */
    public Double getTotalInventoryValue() {
        return comicService.findAll().stream()
                .filter(comic -> comic.getPrice() != null && comic.getStock() != null)
                .mapToDouble(comic -> comic.getPrice() * comic.getStock())
                .sum();
    }

    /**
     * Obtiene estadísticas del inventario por autor
     */
    public Map<String, Long> getInventoryByAuthor() {
        return comicService.findAll().stream()
                .filter(comic -> comic.getAuthor() != null)
                .collect(Collectors.groupingBy(
                    Comic::getAuthor,
                    Collectors.counting()
                ));
    }

    /**
     * Obtiene el stock total de todos los comics
     */
    public Integer getTotalStock() {
        return comicService.findAll().stream()
                .filter(comic -> comic.getStock() != null)
                .mapToInt(Comic::getStock)
                .sum();
    }

    /**
     * Actualiza el stock de múltiples comics
     */
    public boolean bulkUpdateStock(Map<Long, Integer> stockUpdates) {
        try {
            for (Map.Entry<Long, Integer> entry : stockUpdates.entrySet()) {
                Long comicId = entry.getKey();
                Integer newStock = entry.getValue();
                
                comicService.findById(comicId).ifPresent(comic -> {
                    comic.setStock(newStock);
                    comicService.save(comic);
                });
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Genera reporte de inventario
     */
    public InventoryReport generateInventoryReport() {
        List<Comic> allComics = comicService.findAll();
        
        int totalItems = allComics.size();
        int inStockItems = (int) allComics.stream()
                .filter(comic -> comic.getStock() != null && comic.getStock() > 0)
                .count();
        int outOfStockItems = totalItems - inStockItems;
        int lowStockItems = (int) getLowStockComics(5).size();
        
        Double totalValue = getTotalInventoryValue();
        Integer totalStock = getTotalStock();
        
        return new InventoryReport(totalItems, inStockItems, outOfStockItems, 
                                 lowStockItems, totalValue, totalStock);
    }

    // Clase para el reporte de inventario
    public static class InventoryReport {
        private final int totalItems;
        private final int inStockItems;
        private final int outOfStockItems;
        private final int lowStockItems;
        private final Double totalValue;
        private final Integer totalStock;

        public InventoryReport(int totalItems, int inStockItems, int outOfStockItems,
                             int lowStockItems, Double totalValue, Integer totalStock) {
            this.totalItems = totalItems;
            this.inStockItems = inStockItems;
            this.outOfStockItems = outOfStockItems;
            this.lowStockItems = lowStockItems;
            this.totalValue = totalValue;
            this.totalStock = totalStock;
        }

        // Getters
        public int getTotalItems() { return totalItems; }
        public int getInStockItems() { return inStockItems; }
        public int getOutOfStockItems() { return outOfStockItems; }
        public int getLowStockItems() { return lowStockItems; }
        public Double getTotalValue() { return totalValue; }
        public Integer getTotalStock() { return totalStock; }
    }
}