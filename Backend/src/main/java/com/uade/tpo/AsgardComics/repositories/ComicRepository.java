// ...existing code...
package com.uade.tpo.AsgardComics.repositories;

import com.uade.tpo.AsgardComics.models.Comic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ComicRepository extends JpaRepository<Comic, Long> {
    List<Comic> findByTitleContainingIgnoreCase(String title);
    List<Comic> findByAuthorContainingIgnoreCase(String author);
    Optional<Comic> findByTitle(String title);
    Comic save(Comic comic);
    Optional<Comic> findById(Long id);
    void deleteById(Long id);
}
