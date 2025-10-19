package com.uade.tpo.AsgardComics.services.carrito;

import com.uade.tpo.AsgardComics.entity.Carrito;
import com.uade.tpo.AsgardComics.entity.User;
import com.uade.tpo.AsgardComics.entity.Comic;
import com.uade.tpo.AsgardComics.repositories.CarritoRepository;
import com.uade.tpo.AsgardComics.repositories.UserRepository;
import com.uade.tpo.AsgardComics.repositories.ComicRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CarritoService {

    private final CarritoRepository carritoRepository;
    private final UserRepository userRepository;
    private final ComicRepository comicRepository;

    public CarritoService(CarritoRepository carritoRepository, 
                         UserRepository userRepository, 
                         ComicRepository comicRepository) {
        this.carritoRepository = carritoRepository;
        this.userRepository = userRepository;
        this.comicRepository = comicRepository;
    }

    public List<Carrito> findByUserId(Long userId) {
        return carritoRepository.findByUserId(userId);
    }

    public Optional<Carrito> findByUserIdAndComicId(Long userId, Long comicId) {
        return carritoRepository.findByUserIdAndComicId(userId, comicId);
    }

    public Carrito save(Carrito carrito) {
        return carritoRepository.save(carrito);
    }

    @Transactional
    public Optional<Carrito> addToCart(Long userId, Long comicId, Integer quantity) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Comic> comicOpt = comicRepository.findById(comicId);
        
        if (userOpt.isEmpty() || comicOpt.isEmpty()) {
            return Optional.empty();
        }
        
        User user = userOpt.get();
        Comic comic = comicOpt.get();
        
        Optional<Carrito> existingItem = findByUserIdAndComicId(userId, comicId);
        
        if (existingItem.isPresent()) {
            // Si ya existe, actualizar cantidad
            Carrito item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
            return Optional.of(save(item));
        } else {
            // Si no existe, crear nuevo item
            Carrito newItem = new Carrito(user, comic, quantity);
            return Optional.of(save(newItem));
        }
    }

    @Transactional
    public Optional<Carrito> updateQuantity(Long userId, Long comicId, Integer newQuantity) {
        return findByUserIdAndComicId(userId, comicId).map(item -> {
            if (newQuantity <= 0) {
                carritoRepository.delete(item);
                return null;
            } else {
                item.setQuantity(newQuantity);
                return save(item);
            }
        });
    }

    @Transactional
    public boolean removeFromCart(Long userId, Long comicId) {
        return findByUserIdAndComicId(userId, comicId).map(item -> {
            carritoRepository.delete(item);
            return true;
        }).orElse(false);
    }

    @Transactional
    public void clearCart(Long userId) {
        carritoRepository.deleteByUserId(userId);
    }

    public int getTotalItems(Long userId) {
        return findByUserId(userId).stream()
                .mapToInt(Carrito::getQuantity)
                .sum();
    }

    public boolean existsById(Long id) {
        return carritoRepository.existsById(id);
    }
}