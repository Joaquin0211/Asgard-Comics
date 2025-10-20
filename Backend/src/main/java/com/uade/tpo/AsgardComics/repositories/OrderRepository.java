package com.uade.tpo.AsgardComics.repositories;

import com.uade.tpo.AsgardComics.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    
    // Buscar órdenes por usuario
    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    // Buscar orden por número de orden
    Optional<Order> findByOrderNumber(String orderNumber);
    
    // Buscar órdenes por estado
    List<Order> findByStatusOrderByCreatedAtDesc(String status);
    
    // Buscar órdenes por usuario y estado
    List<Order> findByUserIdAndStatusOrderByCreatedAtDesc(Long userId, String status);
    
    // Contar órdenes por usuario
    @Query("SELECT COUNT(o) FROM Order o WHERE o.userId = :userId")
    Long countByUserId(@Param("userId") Long userId);
    
    // Obtener total de ventas
    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.status = 'PAID'")
    Double getTotalSales();
    
    // Obtener total de ventas por usuario
    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.userId = :userId AND o.status = 'PAID'")
    Double getTotalSalesByUser(@Param("userId") Long userId);
}