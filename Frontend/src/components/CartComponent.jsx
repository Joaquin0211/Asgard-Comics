import { useState, useEffect } from 'react';
import { getCart, updateCartQuantity, removeFromCart, clearCart } from '../services/api';
import './CartComponent.css';

function CartComponent({ userId, isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (isOpen && userId) {
      loadCart();
    }
  }, [isOpen, userId]);

  const loadCart = async () => {
    setLoading(true);
    try {
      const items = await getCart(userId);
      setCartItems(items);
      calculateTotal(items);
    } catch (error) {
      console.error('Error cargando carrito:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (items) => {
    const totalAmount = items.reduce((sum, item) => {
      return sum + (item.comic.price * item.quantity);
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
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img 
                      src={item.comic.imageUrl || '/placeholder-comic.jpg'} 
                      alt={item.comic.title}
                      className="item-image"
                    />
                    <div className="item-details">
                      <h4>{item.comic.title}</h4>
                      <p>por {item.comic.author}</p>
                      <p className="price">${item.comic.price}</p>
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
                      ${(item.comic.price * item.quantity).toFixed(2)}
                    </div>
                    <button 
                      onClick={() => handleRemoveItem(item.comic.id)}
                      className="remove-btn"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="cart-footer">
                <div className="total-section">
                  <h3>Total: ${total.toFixed(2)}</h3>
                </div>
                <div className="cart-actions">
                  <button onClick={handleClearCart} className="clear-btn">
                    Vaciar Carrito
                  </button>
                  <button className="checkout-btn">
                    Proceder al Pago
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartComponent;