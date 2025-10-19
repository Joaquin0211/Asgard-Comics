package com.uade.tpo.AsgardComics.services;

import com.uade.tpo.AsgardComics.entity.Carrito;
import com.uade.tpo.AsgardComics.entity.Comic;
import com.uade.tpo.AsgardComics.entity.User;
import com.uade.tpo.AsgardComics.repositories.CarritoRepository;
import com.uade.tpo.AsgardComics.repositories.ComicRepository;
import com.uade.tpo.AsgardComics.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CarritoService {

    private final CarritoRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ComicRepository comicRepository;

    @Autowired
    public CarritoService(CarritoRepository cartItemRepository, 
                UserRepository userRepository,
                ComicRepository comicRepository) {
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.comicRepository = comicRepository;
    }

    public List<Carrito> getCartItems(Long userId) {
        return cartItemRepository.findByUserId(userId);
    }

    @Transactional
    public Carrito addToCart(Long userId, Long comicId, Integer quantity) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        Comic comic = comicRepository.findById(comicId)
            .orElseThrow(() -> new RuntimeException("Comic not found"));

        if (comic.getStock() < quantity) {
            throw new RuntimeException("Not enough stock");
        }

        Optional<Carrito> existingItem = cartItemRepository
            .findByUserIdAndComicId(userId, comicId);

        if (existingItem.isPresent()) {
            Carrito item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
            return cartItemRepository.save(item);
        }

        Carrito newItem = new Carrito(user, comic, quantity);
        return cartItemRepository.save(newItem);
    }

    @Transactional
    public void removeFromCart(Long userId, Long cartItemId) {
        Carrito item = cartItemRepository.findById(cartItemId)
            .orElseThrow(() -> new RuntimeException("Cart item not found"));
        
        if (!item.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        cartItemRepository.deleteById(cartItemId);
    }

    @Transactional
    public void clearCart(Long userId) {
        cartItemRepository.deleteByUserId(userId);
    }

    @Transactional
    public Carrito updateQuantity(Long userId, Long cartItemId, Integer quantity) {
        Carrito item = cartItemRepository.findById(cartItemId)
            .orElseThrow(() -> new RuntimeException("Cart item not found"));
        
        if (!item.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        if (item.getComic().getStock() < quantity) {
            throw new RuntimeException("Not enough stock");
        }

        item.setQuantity(quantity);
        return cartItemRepository.save(item);
    }
}