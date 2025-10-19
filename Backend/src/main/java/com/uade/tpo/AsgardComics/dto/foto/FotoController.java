package com.uade.tpo.AsgardComics.dto.foto;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import com.uade.tpo.AsgardComics.dto.response.ApiResponse;

import java.util.List;

@RestController
@RequestMapping("/api/fotos")
@CrossOrigin(origins = "*")
public class FotoController {
    
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<FotoResponse>> uploadFoto(
            @RequestParam("file") MultipartFile file,
            @RequestParam("publicacionId") Long publicacionId,
            @RequestParam(value = "descripcion", required = false) String descripcion) {
        
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error("El archivo está vacío"));
            }
            
            // Simular procesamiento de upload
            FotoResponse fotoResponse = new FotoResponse();
            fotoResponse.setId(System.currentTimeMillis()); // ID temporal
            fotoResponse.setFilename(file.getOriginalFilename());
            fotoResponse.setContentType(file.getContentType());
            fotoResponse.setSize(file.getSize());
            fotoResponse.setPublicacionId(publicacionId);
            fotoResponse.setDescripcion(descripcion);
            fotoResponse.setUrl("/uploads/" + file.getOriginalFilename());
            fotoResponse.setProcesado(true);
            
            return ResponseEntity.ok(ApiResponse.success("Foto subida exitosamente", fotoResponse));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Error al subir la foto: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/{fotoId}")
    public ResponseEntity<ApiResponse<String>> deleteFoto(
            @PathVariable Long fotoId,
            @RequestBody FotoDeleteRequest request) {
        
        try {
            if (!fotoId.equals(request.getFotoId())) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error("ID de foto no coincide"));
            }
            
            // Simular eliminación
            return ResponseEntity.ok(ApiResponse.success("Foto eliminada exitosamente", "deleted"));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Error al eliminar la foto: " + e.getMessage()));
        }
    }
    
    @GetMapping("/publicacion/{publicacionId}")
    public ResponseEntity<ApiResponse<List<FotoResponse>>> getFotosByPublicacion(
            @PathVariable Long publicacionId) {
        
        try {
            // Simular búsqueda de fotos
            List<FotoResponse> fotos = List.of(); // Lista vacía por ahora
            
            return ResponseEntity.ok(ApiResponse.success("Fotos obtenidas", fotos));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Error al obtener las fotos: " + e.getMessage()));
        }
    }
}