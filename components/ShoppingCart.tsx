import { useEffect } from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Product } from './ProductCard';
import { analyticsService } from '../services/analytics.service';
import styles from '../styles/ShoppingCart.module.css';

export interface CartItem extends Product {
  quantity: number;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export function ShoppingCart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}: ShoppingCartProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  // Track view cart event when cart is opened
  useEffect(() => {
    if (isOpen && cartItems.length > 0) {
      const items = cartItems.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
        item_category: item.category,
      }));

      analyticsService.trackViewCart({
        currency: 'USD',
        value: subtotal,
        items,
      });
    }
  }, [isOpen, cartItems, subtotal]);

  const handleCheckout = () => {
    const items = cartItems.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
      item_category: item.category,
    }));

    analyticsService.trackBeginCheckout({
      currency: 'USD',
      value: subtotal,
      items,
    });

    // Here you would normally navigate to checkout page
    // For demo, we'll track a mock purchase
    const transactionId = `ORDER-${Date.now()}`;
    analyticsService.trackPurchase({
      transaction_id: transactionId,
      currency: 'USD',
      value: subtotal,
      tax: 0,
      shipping,
      items,
    });

    alert(`Order ${transactionId} placed successfully! Total: $${total.toFixed(2)}`);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className={styles.overlay} onClick={onClose} />

      {/* Cart Sidebar */}
      <div className={styles.sidebar}>
        {/* Header */}
        <div className={styles.header}>
          <h2>Shopping Cart</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X />
          </button>
        </div>

        {/* Cart Items */}
        <div className={styles.content}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className={styles.items}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.item}>
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemTitle}>{item.name}</h3>
                    <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                    <div className={styles.quantityControls}>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className={styles.quantityButton}
                      >
                        <Minus />
                      </button>
                      <span className={styles.quantity}>{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className={styles.quantityButton}
                      >
                        <Plus />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className={styles.removeButton}
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.summary}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.total}`}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button className={styles.checkoutButton} onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
