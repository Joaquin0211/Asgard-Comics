package com.uade.tpo.AsgardComics.repositories;

import com.uade.tpo.AsgardComics.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    
    // Buscar items por orden
    List<OrderItem> findByOrderId(Long orderId);
    
    // Buscar items por cómic
    List<OrderItem> findByComicId(Long comicId);
    
    // Obtener estadísticas de ventas por cómic
    @Query("SELECT oi.comic.id, SUM(oi.quantity) as totalSold " +
           "FROM OrderItem oi WHERE oi.order.status = 'PAID' " +
           "GROUP BY oi.comic.id ORDER BY totalSold DESC")
    List<Object[]> getComicSalesStats();
    
    // Obtener los productos más vendidos
    @Query("SELECT oi FROM OrderItem oi " +
           "WHERE oi.order.status = 'PAID' " +
           "GROUP BY oi.comic.id " +
           "ORDER BY SUM(oi.quantity) DESC")
    List<OrderItem> getBestSellingProducts(@Param("limit") int limit);
    
    // Obtener cantidad total vendida de un cómic específico
    @Query("SELECT COALESCE(SUM(oi.quantity), 0) FROM OrderItem oi " +
           "WHERE oi.comic.id = :comicId AND oi.order.status = 'PAID'")
    Integer getTotalSoldByComic(@Param("comicId") Long comicId);
}