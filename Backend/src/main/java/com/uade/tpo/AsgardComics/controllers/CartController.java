package com.uade.tpo.AsgardComics.controllers;

import com.uade.tpo.AsgardComics.entity.Carrito;
import com.uade.tpo.AsgardComics.dto.CartItemDTO;
import com.uade.tpo.AsgardComics.dto.ComicDTO;
import com.uade.tpo.AsgardComics.services.carrito.CarritoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public List<CartItemDTO> getCartByUser(@PathVariable Long userId) {
        List<Carrito> cartItems = carritoService.findByUserId(userId);
        return cartItems.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Método para convertir Carrito a CartItemDTO
    private CartItemDTO convertToDTO(Carrito carrito) {
        ComicDTO comicDTO = new ComicDTO(
            carrito.getComic().getId(),
            carrito.getComic().getTitle(),
            carrito.getComic().getAuthor(),
            carrito.getComic().getDescription(),
            carrito.getComic().getPrice(),
            carrito.getComic().getStock(),
            carrito.getComic().getImageUrl()
        );
        
        return new CartItemDTO(
            carrito.getId(),
            comicDTO,
            carrito.getQuantity()
        );
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