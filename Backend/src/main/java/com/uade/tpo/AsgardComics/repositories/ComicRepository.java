// ...existing code...
package com.uade.tpo.AsgardComics.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uade.tpo.AsgardComics.entity.Comic;

import java.util.List;
import java.util.Optional;

public interface ComicRepository extends JpaRepository<Comic, Long> {
    List<Comic> findByTitleContainingIgnoreCase(String title);
    List<Comic> findByAuthorContainingIgnoreCase(String author);
    Optional<Comic> findByTitle(String title);
}
