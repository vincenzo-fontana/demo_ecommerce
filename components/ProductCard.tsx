import { useState } from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { analyticsService } from '../services/analytics.service';
import styles from '../styles/ProductCard.module.css';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [hasTrackedView, setHasTrackedView] = useState(false);

  const handleImageLoad = () => {
    // Track product view only once per component mount
    if (!hasTrackedView) {
      analyticsService.trackViewItem({
        currency: 'USD',
        value: product.price,
        items: [{
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          quantity: 1,
          item_category: product.category,
        }],
      });
      setHasTrackedView(true);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className={styles.image}
          onLoad={handleImageLoad}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.category}>{product.category}</div>
        <h3 className={styles.title}>{product.name}</h3>
        
        <div className={styles.rating}>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`${styles.star} ${i < Math.floor(product.rating) ? styles.filled : ''}`}
              />
            ))}
          </div>
          <span className={styles.reviews}>({product.reviews})</span>
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(product)}
            className={styles.addButton}
          >
            <ShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
}
