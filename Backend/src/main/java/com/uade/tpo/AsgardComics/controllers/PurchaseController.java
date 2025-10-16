// ...existing code...
package com.uade.tpo.AsgardComics.controllers;

import com.uade.tpo.AsgardComics.models.Purchase;
import com.uade.tpo.AsgardComics.services.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/purchases")
@CrossOrigin(origins = "*")
public class PurchaseController {

    private final PurchaseService purchaseService;

    @Autowired
    public PurchaseController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    @GetMapping
    public List<Purchase> all() {
        return purchaseService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Purchase> get(@PathVariable Long id) {
        Optional<Purchase> p = purchaseService.findById(id);
        return p.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<Purchase> purchasesByUser(@PathVariable Long userId) {
        return purchaseService.findByUserId(userId);
    }

    @PostMapping
    public ResponseEntity<Purchase> create(@RequestBody Purchase purchase) {
        Purchase created = purchaseService.createPurchase(purchase);
        return ResponseEntity.ok(created);
    }
}
