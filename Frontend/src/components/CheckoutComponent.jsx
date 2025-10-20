import { useState } from 'react';
import { processPayment, clearCart } from '../services/api';
import './CheckoutComponent.css';

function CheckoutComponent({ userId, cartItems, total, onClose, onPaymentSuccess }) {
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Validar información del cliente
    if (!customerInfo.firstName.trim()) newErrors.firstName = 'Nombre es requerido';
    if (!customerInfo.lastName.trim()) newErrors.lastName = 'Apellido es requerido';
    if (!customerInfo.email.trim()) newErrors.email = 'Email es requerido';
    if (!customerInfo.phone.trim()) newErrors.phone = 'Teléfono es requerido';
    if (!customerInfo.address.trim()) newErrors.address = 'Dirección es requerida';

    // Validar información de pago
    if (!paymentInfo.cardNumber.replace(/\s/g, '')) newErrors.cardNumber = 'Número de tarjeta es requerido';
    if (!paymentInfo.expiryDate) newErrors.expiryDate = 'Fecha de vencimiento es requerida';
    if (!paymentInfo.cvv) newErrors.cvv = 'CVV es requerido';
    if (!paymentInfo.cardName.trim()) newErrors.cardName = 'Nombre en la tarjeta es requerido';

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (customerInfo.email && !emailRegex.test(customerInfo.email)) {
      newErrors.email = 'Email inválido';
    }

    // Validar tarjeta de crédito (formato básico)
    const cardNumber = paymentInfo.cardNumber.replace(/\s/g, '');
    if (cardNumber && (cardNumber.length < 13 || cardNumber.length > 19)) {
      newErrors.cardNumber = 'Número de tarjeta inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value) => {
    // Remover espacios y caracteres no numéricos
    const cleanValue = value.replace(/\D/g, '');
    // Agregar espacios cada 4 dígitos
    const formattedValue = cleanValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formattedValue;
  };

  const formatExpiryDate = (value) => {
    // Remover caracteres no numéricos
    const cleanValue = value.replace(/\D/g, '');
    // Agregar slash después de los primeros 2 dígitos
    if (cleanValue.length >= 2) {
      return cleanValue.substring(0, 2) + '/' + cleanValue.substring(2, 4);
    }
    return cleanValue;
  };

  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePaymentInfoChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }

    setPaymentInfo(prev => ({ ...prev, [field]: formattedValue }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setProcessing(true);
    
    try {
      // Preparar datos para el pago
      const paymentData = {
        userId: userId,
        customerInfo: customerInfo,
        paymentInfo: {
          cardNumber: paymentInfo.cardNumber.replace(/\s/g, ''),
          expiryDate: paymentInfo.expiryDate,
          cvv: paymentInfo.cvv,
          cardName: paymentInfo.cardName
        },
        items: cartItems,
        total: total
      };

      // Debug logs
      console.log('=== FRONTEND PAYMENT DEBUG ===');
      console.log('UserId:', userId);
      console.log('Total:', total);
      console.log('CartItems:', cartItems);
      console.log('PaymentData:', paymentData);
      console.log('==============================');

      // TEST: Probar endpoint de test primero
      try {
        const testResponse = await fetch('http://localhost:8080/api/payment/test', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData)
        });
        const testResult = await testResponse.text();
        console.log('Test response:', testResult);
      } catch (testError) {
        console.error('Test error:', testError);
      }

      // Procesar pago
      const result = await processPayment(paymentData);
      
      if (result.success) {
        // Limpiar carrito después del pago exitoso
        await clearCart(userId);
        
        alert('¡Pago procesado exitosamente! Tu pedido ha sido confirmado.');
        onPaymentSuccess?.(result);
        onClose();
      } else {
        alert('Error procesando el pago: ' + (result.message || 'Error desconocido'));
      }
    } catch (error) {
      console.error('Error procesando pago:', error);
      alert('Error procesando el pago. Por favor intenta nuevamente.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="checkout-overlay">
      <div className="checkout-modal">
        <div className="checkout-header">
          <h2>Finalizar Compra</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="checkout-content">
          <form onSubmit={handleSubmit}>
            {/* Información del Cliente */}
            <div className="section">
              <h3>Información de Entrega</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre *</label>
                  <input
                    type="text"
                    value={customerInfo.firstName}
                    onChange={(e) => handleCustomerInfoChange('firstName', e.target.value)}
                    className={errors.firstName ? 'error' : ''}
                    placeholder="Tu nombre"
                  />
                  {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label>Apellido *</label>
                  <input
                    type="text"
                    value={customerInfo.lastName}
                    onChange={(e) => handleCustomerInfoChange('lastName', e.target.value)}
                    className={errors.lastName ? 'error' : ''}
                    placeholder="Tu apellido"
                  />
                  {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                  className={errors.email ? 'error' : ''}
                  placeholder="tu@email.com"
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Teléfono *</label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                  className={errors.phone ? 'error' : ''}
                  placeholder="11 1234-5678"
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label>Dirección *</label>
                <input
                  type="text"
                  value={customerInfo.address}
                  onChange={(e) => handleCustomerInfoChange('address', e.target.value)}
                  className={errors.address ? 'error' : ''}
                  placeholder="Av. Corrientes 1234, Piso 5, Depto A"
                />
                {errors.address && <span className="error-text">{errors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Ciudad</label>
                  <input
                    type="text"
                    value={customerInfo.city}
                    onChange={(e) => handleCustomerInfoChange('city', e.target.value)}
                    placeholder="Buenos Aires"
                  />
                </div>
                <div className="form-group">
                  <label>Código Postal</label>
                  <input
                    type="text"
                    value={customerInfo.zipCode}
                    onChange={(e) => handleCustomerInfoChange('zipCode', e.target.value)}
                    placeholder="1234"
                  />
                </div>
              </div>
            </div>

            {/* Información de Pago */}
            <div className="section">
              <h3>Información de Pago</h3>
              <div className="form-group">
                <label>Nombre en la Tarjeta *</label>
                <input
                  type="text"
                  value={paymentInfo.cardName}
                  onChange={(e) => handlePaymentInfoChange('cardName', e.target.value)}
                  className={errors.cardName ? 'error' : ''}
                  placeholder="Juan Pérez"
                />
                {errors.cardName && <span className="error-text">{errors.cardName}</span>}
              </div>

              <div className="form-group">
                <label>Número de Tarjeta *</label>
                <input
                  type="text"
                  value={paymentInfo.cardNumber}
                  onChange={(e) => handlePaymentInfoChange('cardNumber', e.target.value)}
                  className={errors.cardNumber ? 'error' : ''}
                  placeholder="1234 5678 9012 3456"
                  maxLength="23"
                />
                {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Fecha de Vencimiento *</label>
                  <input
                    type="text"
                    value={paymentInfo.expiryDate}
                    onChange={(e) => handlePaymentInfoChange('expiryDate', e.target.value)}
                    className={errors.expiryDate ? 'error' : ''}
                    placeholder="MM/AA"
                    maxLength="5"
                  />
                  {errors.expiryDate && <span className="error-text">{errors.expiryDate}</span>}
                </div>
                <div className="form-group">
                  <label>CVV *</label>
                  <input
                    type="text"
                    value={paymentInfo.cvv}
                    onChange={(e) => handlePaymentInfoChange('cvv', e.target.value)}
                    className={errors.cvv ? 'error' : ''}
                    placeholder="123"
                    maxLength="4"
                  />
                  {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                </div>
              </div>
            </div>

            {/* Resumen del Pedido */}
            <div className="section">
              <h3>Resumen del Pedido</h3>
              <div className="order-summary">
                {cartItems.map((item) => {
                  // Obtener información del producto transformado
                  const transformedProducts = JSON.parse(localStorage.getItem('transformedProducts') || '{}');
                  const transformed = transformedProducts[item.comic.id];
                  const productInfo = transformed || {
                    title: item.comic.title,
                    price: item.comic.price
                  };
                  
                  return (
                    <div key={item.id} className="order-item">
                      <span>{productInfo.title} x{item.quantity}</span>
                      <span>${(productInfo.price * item.quantity).toFixed(2)}</span>
                    </div>
                  );
                })}
                <div className="order-total">
                  <strong>Total: ${total.toFixed(2)}</strong>
                </div>
              </div>
            </div>

            <div className="checkout-actions">
              <button type="button" onClick={onClose} className="cancel-btn">
                Cancelar
              </button>
              <button 
                type="submit" 
                disabled={processing}
                className="pay-btn"
              >
                {processing ? 'Procesando...' : `Pagar $${total.toFixed(2)}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckoutComponent;