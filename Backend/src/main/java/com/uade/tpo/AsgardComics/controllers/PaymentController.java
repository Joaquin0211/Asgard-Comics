package com.uade.tpo.AsgardComics.controllers;

import com.uade.tpo.AsgardComics.dto.CartItemDTO;
import com.uade.tpo.AsgardComics.dto.PaymentRequestDTO;
import com.uade.tpo.AsgardComics.dto.PaymentResponseDTO;
import com.uade.tpo.AsgardComics.entity.Order;
import com.uade.tpo.AsgardComics.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/process")
    public ResponseEntity<PaymentResponseDTO> processPayment(@RequestBody PaymentRequestDTO paymentRequest) {
        try {
            // Log para debug
            System.out.println("=== PAYMENT DEBUG ===");
            System.out.println("UserId: " + paymentRequest.getUserId());
            System.out.println("Total: " + paymentRequest.getTotal());
            System.out.println("Items count: " + (paymentRequest.getItems() != null ? paymentRequest.getItems().size() : "null"));
            if (paymentRequest.getItems() != null) {
                for (int i = 0; i < paymentRequest.getItems().size(); i++) {
                    CartItemDTO item = paymentRequest.getItems().get(i);
                    System.out.println("Item " + i + ": ID=" + item.getId() + ", ComicID=" + (item.getComic() != null ? item.getComic().getId() : "null") + ", Qty=" + item.getQuantity());
                }
            }
            System.out.println("==================");
            
            PaymentResponseDTO response = paymentService.processPayment(paymentRequest);
            
            if (response.isSuccess()) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.badRequest().body(response);
            }
        } catch (Exception e) {
            e.printStackTrace(); // Imprimir stack trace completo
            return ResponseEntity.internalServerError()
                    .body(PaymentResponseDTO.failure("Error interno del servidor: " + e.getMessage()));
        }
    }

    @GetMapping("/orders/{userId}")
    public ResponseEntity<List<Order>> getOrderHistory(@PathVariable Long userId) {
        try {
            List<Order> orders = paymentService.getOrderHistory(userId);
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long orderId) {
        try {
            Optional<Order> order = paymentService.getOrderById(orderId);
            return order.map(ResponseEntity::ok)
                       .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/order/number/{orderNumber}")
    public ResponseEntity<Order> getOrderByNumber(@PathVariable String orderNumber) {
        try {
            Optional<Order> order = paymentService.getOrderByNumber(orderNumber);
            return order.map(ResponseEntity::ok)
                       .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/test")
    public ResponseEntity<String> testPayment(@RequestBody PaymentRequestDTO paymentRequest) {
        try {
            System.out.println("=== TEST PAYMENT ===");
            System.out.println("Received payment request");
            System.out.println("UserId: " + paymentRequest.getUserId());
            System.out.println("Total: " + paymentRequest.getTotal());
            System.out.println("Items: " + (paymentRequest.getItems() != null ? paymentRequest.getItems().size() : "null"));
            
            if (paymentRequest.getItems() != null) {
                for (CartItemDTO item : paymentRequest.getItems()) {
                    System.out.println("Item ID: " + item.getId());
                    System.out.println("Comic: " + (item.getComic() != null ? item.getComic().getTitle() : "null"));
                    System.out.println("Quantity: " + item.getQuantity());
                }
            }
            
            return ResponseEntity.ok("Test successful");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }
}