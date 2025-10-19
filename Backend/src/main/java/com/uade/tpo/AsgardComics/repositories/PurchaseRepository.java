package com.uade.tpo.AsgardComics.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uade.tpo.AsgardComics.entity.Purchase;

import java.util.List;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    List<Purchase> findByUserId(Long userId);
    List<Purchase> findByComicId(Long comicId);
    List<Purchase> findByUserIdAndComicId(Long userId, Long comicId);
    List<Purchase> findByUserIdOrderByPurchaseDateDesc(Long userId);
}
