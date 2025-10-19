package com.uade.tpo.AsgardComics.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uade.tpo.AsgardComics.entity.Carrito;

import java.util.List;
import java.util.Optional;


public interface CarritoRepository extends JpaRepository<Carrito, Long>{
    List<Carrito> findByUserId(Long userid);
    Optional<Carrito> findByUserIdAndComicId(Long userid, Long comicid);
    void deleteByUserId(Long userid);

}
