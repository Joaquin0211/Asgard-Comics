package com.uade.tpo.AsgardComics.services.comic;

import com.uade.tpo.AsgardComics.entity.Comic;
import com.uade.tpo.AsgardComics.repositories.ComicRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ComicService {

    private final ComicRepository comicRepository;

    public ComicService(ComicRepository comicRepository) {
        this.comicRepository = comicRepository;
    }

    public List<Comic> findAll() {
        return comicRepository.findAll();
    }

    public Optional<Comic> findById(Long id) {
        return comicRepository.findById(id);
    }

    public List<Comic> findByTitle(String title) {
        return comicRepository.findByTitleContainingIgnoreCase(title);
    }

    public List<Comic> findByAuthor(String author) {
        return comicRepository.findByAuthorContainingIgnoreCase(author);
    }

    public Comic save(Comic comic) {
        return comicRepository.save(comic);
    }

    @Transactional
    public Optional<Comic> update(Long id, Comic comic) {
        return comicRepository.findById(id).map(existing -> {
            existing.setTitle(comic.getTitle());
            existing.setAuthor(comic.getAuthor());
            existing.setPrice(comic.getPrice());
            existing.setStock(comic.getStock());
            existing.setImageUrl(comic.getImageUrl());
            existing.setDescription(comic.getDescription());
            return comicRepository.save(existing);
        });
    }

    public boolean deleteById(Long id) {
        return comicRepository.findById(id).map(c -> {
            comicRepository.deleteById(id);
            return true;
        }).orElse(false);
    }

    @Transactional
    public Optional<Comic> adjustStock(Long id, int delta) {
        return comicRepository.findById(id).map(c -> {
            int newStock = (c.getStock() == null ? 0 : c.getStock()) + delta;
            c.setStock(Math.max(0, newStock)); // No permitir stock negativo
            return comicRepository.save(c);
        });
    }

    public boolean isInStock(Long id, int quantity) {
        return comicRepository.findById(id)
                .map(comic -> comic.getStock() != null && comic.getStock() >= quantity)
                .orElse(false);
    }
}