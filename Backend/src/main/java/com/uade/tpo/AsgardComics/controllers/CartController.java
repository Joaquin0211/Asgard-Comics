package com.uade.tpo.AsgardComics.controllers;

import com.uade.tpo.AsgardComics.entity.Carrito;
import com.uade.tpo.AsgardComics.services.carrito.CarritoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    private final CarritoService carritoService;

    public CartController(CarritoService carritoService) {
        this.carritoService = carritoService;
    }

    // Obtener carrito de un usuario
    @GetMapping("/user/{userId}")
    public List<Carrito> getCartByUser(@PathVariable Long userId) {
        return carritoService.findByUserId(userId);
    }

    // Agregar item al carrito
    @PostMapping("/add")
    public ResponseEntity<Carrito> addToCart(@RequestParam Long userId,
                                           @RequestParam Long comicId,
                                           @RequestParam Integer quantity) {
        Optional<Carrito> result = carritoService.addToCart(userId, comicId, quantity);
        return result.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    // Actualizar cantidad de un item
    @PutMapping("/update")
    public ResponseEntity<Carrito> updateQuantity(@RequestParam Long userId,
                                                 @RequestParam Long comicId,
                                                 @RequestParam Integer quantity) {
        Optional<Carrito> result = carritoService.updateQuantity(userId, comicId, quantity);
        return result.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Remover item del carrito
    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeFromCart(@RequestParam Long userId,
                                             @RequestParam Long comicId) {
        boolean removed = carritoService.removeFromCart(userId, comicId);
        return removed ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    // Vaciar carrito
    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        carritoService.clearCart(userId);
        return ResponseEntity.ok().build();
    }

    // Obtener total de items en el carrito
    @GetMapping("/count/{userId}")
    public ResponseEntity<Integer> getCartItemCount(@PathVariable Long userId) {
        int count = carritoService.getTotalItems(userId);
        return ResponseEntity.ok(count);
    }
}