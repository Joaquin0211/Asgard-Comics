package com.uade.tpo.AsgardComics.controllers;

import com.uade.tpo.AsgardComics.entity.Carrito;
import com.uade.tpo.AsgardComics.services.CarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
        List<Carrito> items = cartService.getCartItems(userId);
        return ResponseEntity.ok(items);
    }

    @PostMapping("/{userId}/items")
    public ResponseEntity<Carrito> addToCart(
            @PathVariable Long userId,
            @RequestBody Map<String, Object> payload) {
        Long comicId = Long.parseLong(payload.get("comicId").toString());
        Integer quantity = Integer.parseInt(payload.get("quantity").toString());
        
        Carrito item = cartService.addToCart(userId, comicId, quantity);
        return ResponseEntity.ok(item);
    }

    @DeleteMapping("/{userId}/items/{itemId}")
    public ResponseEntity<Void> removeFromCart(
            @PathVariable Long userId,
            @PathVariable Long itemId) {
        cartService.removeFromCart(userId, itemId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{userId}/items/{itemId}")
    public ResponseEntity<Carrito> updateQuantity(
            @PathVariable Long userId,
            @PathVariable Long itemId,
            @RequestBody Map<String, Integer> payload) {
        Integer quantity = payload.get("quantity");
        Carrito item = cartService.updateQuantity(userId, itemId, quantity);
        return ResponseEntity.ok(item);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}
