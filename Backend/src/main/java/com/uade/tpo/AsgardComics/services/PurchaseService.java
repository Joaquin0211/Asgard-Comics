// ...existing code...
package com.uade.tpo.AsgardComics.services;

import com.uade.tpo.AsgardComics.entity.Comic;
import com.uade.tpo.AsgardComics.entity.Purchase;
import com.uade.tpo.AsgardComics.repositories.ComicRepository;
import com.uade.tpo.AsgardComics.repositories.PurchaseRepository;
import com.uade.tpo.AsgardComics.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final ComicRepository comicRepository;
    private final UserRepository userRepository;

    @Autowired
    public PurchaseService(PurchaseRepository purchaseRepository,
    ComicRepository comicRepository,
    UserRepository userRepository) {
        this.purchaseRepository = purchaseRepository;
        this.comicRepository = comicRepository;
        this.userRepository = userRepository;
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

    @Transactional
    public Purchase createPurchase(Purchase purchase) {
        // Asume que purchase.getComic().getId() y purchase.getUser().getId() vienen con IDs válidos
        Long comicId = purchase.getComic() != null ? purchase.getComic().getId() : null;
        Long userId = purchase.getUser() != null ? purchase.getUser().getId() : null;

        if (comicId == null || userId == null) {
            throw new IllegalArgumentException("Purchase must include comic id and user id");
        }

        Comic comic = comicRepository.findById(comicId)
                .orElseThrow(() -> new IllegalArgumentException("Comic not found"));

        if (purchase.getQuantity() == null || purchase.getQuantity() <= 0) {
            throw new IllegalArgumentException("Quantity must be > 0");
        }

        Integer stock = comic.getStock() == null ? 0 : comic.getStock();
        if (stock < purchase.getQuantity()) {
            throw new IllegalStateException("Not enough stock");
        }

        // decrement stock
        comic.setStock(stock - purchase.getQuantity());
        comicRepository.save(comic);

        // calculate total price if model tiene campo price/totalPrice
        if (comic.getPrice() != null) {
            // Ajusta tipos si usas BigDecimal
            purchase.setTotalPrice(comic.getPrice() * purchase.getQuantity());
        }

        // ensure user exists
        userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

        purchase.setComic(comic);
        return purchaseRepository.save(purchase);
    }
}