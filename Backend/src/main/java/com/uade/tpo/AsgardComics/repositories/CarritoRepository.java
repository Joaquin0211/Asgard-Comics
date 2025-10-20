package com.uade.tpo.AsgardComics.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.uade.tpo.AsgardComics.entity.Carrito;

import java.util.List;
import java.util.Optional;


public interface CarritoRepository extends JpaRepository<Carrito, Long>{
    
    @Query("SELECT c FROM Carrito c JOIN FETCH c.comic JOIN FETCH c.user WHERE c.user.id = :userId")
    List<Carrito> findByUserId(@Param("userId") Long userid);
    
    @Query("SELECT c FROM Carrito c JOIN FETCH c.comic JOIN FETCH c.user WHERE c.user.id = :userId AND c.comic.id = :comicId")
    Optional<Carrito> findByUserIdAndComicId(@Param("userId") Long userid, @Param("comicId") Long comicid);
    
    void deleteByUserId(Long userid);
}
