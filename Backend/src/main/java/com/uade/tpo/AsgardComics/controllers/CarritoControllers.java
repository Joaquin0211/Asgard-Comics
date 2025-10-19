package com.uade.tpo.AsgardComics.controllers;

import com.uade.tpo.AsgardComics.entity.Carrito;
import com.uade.tpo.AsgardComics.services.carrito.CarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CarritoControllers {

    private final CarritoService cartService;

    @Autowired
    public CarritoControllers(CarritoService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Carrito>> getCart(@PathVariable Long userId) {
        List<Carrito> items = cartService.findByUserId(userId);
        return ResponseEntity.ok(items);
    }

    @PostMapping("/{userId}/items")
    public ResponseEntity<Carrito> addToCart(
            @PathVariable Long userId,
            @RequestBody Map<String, Object> payload) {
        Long comicId = Long.parseLong(payload.get("comicId").toString());
        Integer quantity = Integer.parseInt(payload.get("quantity").toString());
        
        Optional<Carrito> item = cartService.addToCart(userId, comicId, quantity);
        if (item.isPresent()) {
            return ResponseEntity.ok(item.get());
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{userId}/items/{comicId}")
    public ResponseEntity<Void> removeFromCart(
            @PathVariable Long userId,
            @PathVariable Long comicId) {
        boolean removed = cartService.removeFromCart(userId, comicId);
        if (removed) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{userId}/items/{comicId}")
    public ResponseEntity<Carrito> updateQuantity(
            @PathVariable Long userId,
            @PathVariable Long comicId,
            @RequestBody Map<String, Integer> payload) {
        Integer quantity = payload.get("quantity");
        Optional<Carrito> item = cartService.updateQuantity(userId, comicId, quantity);
        if (item.isPresent() && item.get() != null) {
            return ResponseEntity.ok(item.get());
        } else {
            return ResponseEntity.noContent().build(); // Item was deleted due to quantity <= 0
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{userId}/total")
    public ResponseEntity<Map<String, Integer>> getTotalItems(@PathVariable Long userId) {
        int total = cartService.getTotalItems(userId);
        return ResponseEntity.ok(Map.of("totalItems", total));
    }
}
