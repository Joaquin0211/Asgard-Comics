package com.uade.tpo.AsgardComics.services;

import com.uade.tpo.AsgardComics.dto.*;
import com.uade.tpo.AsgardComics.entity.*;
import com.uade.tpo.AsgardComics.repositories.*;
import com.uade.tpo.AsgardComics.services.carrito.CarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PaymentService {

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private OrderItemRepository orderItemRepository;
    
    @Autowired
    private ComicRepository comicRepository;
    
    @Autowired
    private CarritoService carritoService;

    @Transactional
    public PaymentResponseDTO processPayment(PaymentRequestDTO paymentRequest) {
        try {
            // Debug logs
            System.out.println("=== PAYMENT SERVICE DEBUG ===");
            System.out.println("Processing payment...");
            
            // 1. Validar datos de entrada
            if (paymentRequest == null) {
                return PaymentResponseDTO.failure("Request de pago es nulo");
            }
            
            if (paymentRequest.getUserId() == null) {
                return PaymentResponseDTO.failure("ID de usuario requerido");
            }
            
            if (paymentRequest.getItems() == null) {
                return PaymentResponseDTO.failure("Items es nulo");
            }
            
            if (paymentRequest.getItems().isEmpty()) {
                return PaymentResponseDTO.failure("Carrito vacío");
            }
            
            System.out.println("Validation passed, processing " + paymentRequest.getItems().size() + " items");
            
            // 2. Validar stock disponible
            for (CartItemDTO item : paymentRequest.getItems()) {
                Optional<Comic> comicOpt = comicRepository.findById(item.getComic().getId());
                if (comicOpt.isEmpty()) {
                    return PaymentResponseDTO.failure("Producto no encontrado: " + item.getComic().getTitle());
                }
                
                Comic comic = comicOpt.get();
                if (comic.getStock() < item.getQuantity()) {
                    return PaymentResponseDTO.failure("Stock insuficiente para: " + comic.getTitle() + 
                                                    " (disponible: " + comic.getStock() + ", solicitado: " + item.getQuantity() + ")");
                }
            }
            
            // 3. Simular procesamiento de pago (aquí se integraría con un procesador de pagos real)
            boolean paymentProcessed = simulatePaymentProcessing(paymentRequest.getPaymentInfo());
            if (!paymentProcessed) {
                return PaymentResponseDTO.failure("Error procesando el pago. Verifique los datos de la tarjeta.");
            }
            
            // 4. Crear orden
            String orderNumber = generateOrderNumber();
            Order order = new Order();
            order.setUserId(paymentRequest.getUserId());
            order.setOrderNumber(orderNumber);
            order.setTotalAmount(paymentRequest.getTotal());
            order.setStatus("PAID");
            order.setCreatedAt(LocalDateTime.now());
            order.setPaidAt(LocalDateTime.now());
            
            // Información del cliente
            CustomerInfoDTO customerInfo = paymentRequest.getCustomerInfo();
            order.setCustomerFirstName(customerInfo.getFirstName());
            order.setCustomerLastName(customerInfo.getLastName());
            order.setCustomerEmail(customerInfo.getEmail());
            order.setCustomerPhone(customerInfo.getPhone());
            order.setCustomerAddress(customerInfo.getAddress());
            order.setCustomerCity(customerInfo.getCity());
            order.setCustomerZipCode(customerInfo.getZipCode());
            
            // Información del pago
            PaymentInfoDTO paymentInfo = paymentRequest.getPaymentInfo();
            order.setPaymentMethod("CREDIT_CARD");
            order.setCardLastFour(paymentInfo.getLastFourDigits());
            order.setCardBrand(paymentInfo.getCardBrand());
            
            // Guardar orden
            order = orderRepository.save(order);
            
            // 5. Crear items de orden y actualizar inventario
            for (CartItemDTO cartItem : paymentRequest.getItems()) {
                Comic comic = comicRepository.findById(cartItem.getComic().getId()).get();
                
                // Crear item de orden
                OrderItem orderItem = new OrderItem();
                orderItem.setOrder(order);
                orderItem.setComic(comic);
                orderItem.setQuantity(cartItem.getQuantity());
                
                // Obtener precio del producto transformado del localStorage (simulado aquí)
                Double unitPrice = cartItem.getComic().getPrice();
                orderItem.setUnitPrice(unitPrice);
                orderItem.setTotalPrice(unitPrice * cartItem.getQuantity());
                
                // Información del producto transformado
                orderItem.setProductTitle(cartItem.getComic().getTitle());
                orderItem.setProductCategory("comic"); // Por defecto, se podría extender para incluir categorías
                
                orderItemRepository.save(orderItem);
                
                // Actualizar stock
                comic.setStock(comic.getStock() - cartItem.getQuantity());
                comicRepository.save(comic);
            }
            
            // 6. Limpiar carrito
            carritoService.clearCart(paymentRequest.getUserId());
            
            return PaymentResponseDTO.success(
                "Pago procesado exitosamente",
                orderNumber,
                order.getId()
            );
            
        } catch (Exception e) {
            e.printStackTrace();
            return PaymentResponseDTO.failure("Error interno del servidor: " + e.getMessage());
        }
    }
    
    public List<Order> getOrderHistory(Long userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
    
    public Optional<Order> getOrderById(Long orderId) {
        return orderRepository.findById(orderId);
    }
    
    public Optional<Order> getOrderByNumber(String orderNumber) {
        return orderRepository.findByOrderNumber(orderNumber);
    }
    
    private String generateOrderNumber() {
        // Generar número de orden único
        String timestamp = String.valueOf(System.currentTimeMillis());
        String uuid = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        return "ORD-" + timestamp.substring(timestamp.length() - 8) + "-" + uuid;
    }
    
    private boolean simulatePaymentProcessing(PaymentInfoDTO paymentInfo) {
        // Simulación de procesamiento de pago
        // En una implementación real, aquí se integraría con Stripe, PayPal, MercadoPago, etc.
        
        // Validaciones básicas simuladas
        if (paymentInfo.getCardNumber() == null || paymentInfo.getCardNumber().length() < 13) {
            return false;
        }
        
        if (paymentInfo.getCvv() == null || paymentInfo.getCvv().length() < 3) {
            return false;
        }
        
        // Simular delay de procesamiento
        try {
            Thread.sleep(1000); // 1 segundo de delay simulado
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Simular 95% de éxito
        return Math.random() > 0.05;
    }
}