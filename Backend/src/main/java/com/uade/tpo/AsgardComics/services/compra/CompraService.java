package com.uade.tpo.AsgardComics.services.compra;

import com.uade.tpo.AsgardComics.entity.Purchase;
import com.uade.tpo.AsgardComics.repositories.PurchaseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CompraService {

    private final PurchaseRepository purchaseRepository;

    public CompraService(PurchaseRepository purchaseRepository) {
        this.purchaseRepository = purchaseRepository;
    }

    public List<Purchase> findAll() {
        return purchaseRepository.findAll();
    }

    public Optional<Purchase> findById(Long id) {
        return purchaseRepository.findById(id);
    }

    public List<Purchase> findByUserId(Long userId) {
        return purchaseRepository.findByUserId(userId);
    }

    public List<Purchase> findByComicId(Long comicId) {
        return purchaseRepository.findByComicId(comicId);
    }

    public List<Purchase> findByUserIdAndComicId(Long userId, Long comicId) {
        return purchaseRepository.findByUserIdAndComicId(userId, comicId);
    }

    public List<Purchase> findByUserIdOrderByDate(Long userId) {
        return purchaseRepository.findByUserIdOrderByPurchaseDateDesc(userId);
    }

    public Purchase save(Purchase purchase) {
        if (purchase.getPurchaseDate() == null) {
            purchase.setPurchaseDate(LocalDateTime.now());
        }
        return purchaseRepository.save(purchase);
    }

    @Transactional
    public Optional<Purchase> update(Long id, Purchase purchase) {
        return purchaseRepository.findById(id).map(existing -> {
            existing.setQuantity(purchase.getQuantity());
            existing.setTotalPrice(purchase.getTotalPrice());
            // No actualizar fecha de compra ni usuario/comic
            return purchaseRepository.save(existing);
        });
    }

    public boolean deleteById(Long id) {
        return purchaseRepository.findById(id).map(purchase -> {
            purchaseRepository.deleteById(id);
            return true;
        }).orElse(false);
    }

    public boolean existsById(Long id) {
        return purchaseRepository.existsById(id);
    }

    /**
     * Obtiene el total gastado por un usuario
     */
    public Double getTotalSpentByUser(Long userId) {
        return findByUserId(userId).stream()
                .filter(purchase -> purchase.getTotalPrice() != null)
                .mapToDouble(Purchase::getTotalPrice)
                .sum();
    }

    /**
     * Obtiene el número total de compras de un usuario
     */
    public Long getTotalPurchasesByUser(Long userId) {
        return (long) findByUserId(userId).size();
    }

    /**
     * Verifica si un usuario ya compró un comic específico
     */
    public boolean hasUserPurchasedComic(Long userId, Long comicId) {
        return !findByUserIdAndComicId(userId, comicId).isEmpty();
    }
}