import { useState, useEffect } from 'react';
import { getCart, updateCartQuantity, removeFromCart, clearCart } from '../services/api';
import CheckoutComponent from './CheckoutComponent';
import './CartComponent.css';

function CartComponent({ userId, isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  
  // Función para obtener información del producto (transformado o original)
  const getProductInfo = (item) => {
    const transformedProducts = JSON.parse(localStorage.getItem('transformedProducts') || '{}');
    const transformed = transformedProducts[item.comic.id];
    
    if (transformed) {
      return {
        title: transformed.title,
        author: transformed.author,
        price: transformed.price,
        category: transformed.category,
        description: transformed.description
      };
    }
    
    // Si no hay transformación, usar datos originales
    return {
      title: item.comic.title,
      author: item.comic.author,
      price: item.comic.price,
      category: 'comic',
      description: item.comic.description
    };
  };

  useEffect(() => {
    if (isOpen && userId) {
      loadCart();
    }
  }, [isOpen, userId]);

  const loadCart = async () => {
    setLoading(true);
    try {
      const items = await getCart(userId);
      console.log('Cart items loaded:', items); // Debug
      setCartItems(items || []);
      calculateTotal(items || []);
    } catch (error) {
      console.error('Error cargando carrito:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (items) => {
    const totalAmount = items.reduce((sum, item) => {
      const productInfo = getProductInfo(item);
      return sum + (productInfo.price * item.quantity);
    }, 0);
    setTotal(totalAmount);
  };

  const handleQuantityChange = async (comicId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      await updateCartQuantity(userId, comicId, newQuantity);
      loadCart(); // Recargar carrito
    } catch (error) {
      console.error('Error actualizando cantidad:', error);
    }
  };

  const handleRemoveItem = async (comicId) => {
    try {
      await removeFromCart(userId, comicId);
      loadCart(); // Recargar carrito
    } catch (error) {
      console.error('Error removiendo item:', error);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('¿Estás seguro de vaciar el carrito?')) {
      try {
        await clearCart(userId);
        loadCart(); // Recargar carrito
      } catch (error) {
        console.error('Error vaciando carrito:', error);
      }
    }
  };

  if (!isOpen) return null;

  console.log('CartComponent - userId:', userId, 'isOpen:', isOpen); // Debug

  return (
    <div className="cart-overlay">
      <div className="cart-modal">
        <div className="cart-header">
          <h2>Mi Carrito</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="cart-content">
          {loading ? (
            <div className="loading">Cargando...</div>
          ) : cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => {
                  const productInfo = getProductInfo(item);
                  return (
                    <div key={item.id} className="cart-item">
                      <img 
                        src={item.comic.imageUrl || '/placeholder-comic.jpg'} 
                        alt={productInfo.title}
                        className="item-image"
                      />
                      <div className="item-details">
                        <h4>{productInfo.title}</h4>
                        <p>por {productInfo.author}</p>
                        <p className="price">${productInfo.price}</p>
                        {productInfo.category !== 'comic' && (
                          <p className="category-badge">{productInfo.category.charAt(0).toUpperCase() + productInfo.category.slice(1)}</p>
                        )}
                      </div>
                      <div className="quantity-controls">
                        <button 
                          onClick={() => handleQuantityChange(item.comic.id, item.quantity - 1)}
                          className="qty-btn"
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(item.comic.id, item.quantity + 1)}
                          className="qty-btn"
                        >
                          +
                        </button>
                      </div>
                      <div className="item-total">
                        ${(productInfo.price * item.quantity).toFixed(2)}
                      </div>
                      <button 
                        onClick={() => handleRemoveItem(item.comic.id)}
                        className="remove-btn"
                      >
                        🗑️
                      </button>
                    </div>
                  );
                })}
              </div>
              
              <div className="cart-footer">
                <div className="total-section">
                  <h3>Total: ${total.toFixed(2)}</h3>
                </div>
                <div className="cart-actions">
                  <button onClick={handleClearCart} className="clear-btn">
                    Vaciar Carrito
                  </button>
                  <button 
                    onClick={() => setShowCheckout(true)} 
                    className="checkout-btn"
                    disabled={cartItems.length === 0}
                  >
                    Proceder al Pago
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Componente de Checkout */}
      {showCheckout && (
        <CheckoutComponent
          userId={userId}
          cartItems={cartItems}
          total={total}
          onClose={() => setShowCheckout(false)}
          onPaymentSuccess={(result) => {
            console.log('Pago exitoso:', result);
            // Recargar carrito (estará vacío después del pago)
            loadCart();
            // Disparar evento para actualizar contador del carrito
            window.dispatchEvent(new CustomEvent('cartUpdated'));
          }}
        />
      )}
    </div>
  );
}

export default CartComponent;