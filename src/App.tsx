import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ProductCard, Product } from '../components/ProductCard';
import { ShoppingCart, CartItem } from '../components/ShoppingCart';
import { useAnalytics } from '../hooks/useAnalytics';
import styles from '../styles/App.module.css';
import '../styles/base.css';

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzY0NjI3OTUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Electronics',
    rating: 4.5,
    reviews: 328,
  },
  {
    id: 2,
    name: 'Ultra-Thin Laptop Pro',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1619606619096-c759b30552bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsYXB0b3B8ZW58MXx8fHwxNzY0NjQxNzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Electronics',
    rating: 5,
    reviews: 512,
  },
  {
    id: 3,
    name: 'Smart Fitness Watch',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1579721840641-7d0e67f1204e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjQ2MDQ0ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Electronics',
    rating: 4,
    reviews: 243,
  },
  {
    id: 4,
    name: 'Performance Running Shoes',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1597892657493-6847b9640bac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXN8ZW58MXx8fHwxNzY0NjY4NDA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Fashion',
    rating: 4.5,
    reviews: 456,
  },
  {
    id: 5,
    name: 'Automatic Coffee Maker',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1608354580875-30bd4168b351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBtYWtlcnxlbnwxfHx8fDE3NjQ2MzgzNDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Home & Living',
    rating: 4,
    reviews: 178,
  },
  {
    id: 6,
    name: 'Travel Backpack Pro',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1570630358718-4fb324824b3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFjayUyMHRyYXZlbHxlbnwxfHx8fDE3NjQ2NTc1NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Fashion',
    rating: 4.5,
    reviews: 298,
  },
  {
    id: 7,
    name: 'Professional DSLR Camera',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1579535984712-92fffbbaa266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjQ2Mzc1NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Electronics',
    rating: 5,
    reviews: 621,
  },
  {
    id: 8,
    name: 'Modern Desk Lamp',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1621447980929-6638614633c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNrJTIwbGFtcHxlbnwxfHx8fDE3NjQ2NzYxODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Home & Living',
    rating: 4,
    reviews: 134,
  },
  {
    id: 9,
    name: 'Premium Yoga Mat',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1646239646963-b0b9be56d6b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWF0fGVufDF8fHx8MTc2NDY3NjE4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Sports & Fitness',
    rating: 4.5,
    reviews: 267,
  },
  {
    id: 10,
    name: 'Designer Sunglasses',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1663585703603-9be01a72a62a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjQ2Mjg4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Fashion',
    rating: 4,
    reviews: 189,
  },
  {
    id: 11,
    name: 'Insulated Water Bottle',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGJvdHRsZXxlbnwxfHx8fDE3NjQ2MjI2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Sports & Fitness',
    rating: 4.5,
    reviews: 412,
  },
  {
    id: 12,
    name: 'Phone Charging Station',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1566793474285-2decf0fc182a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc2NDU5NjQ1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Electronics',
    rating: 4,
    reviews: 156,
  },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Initialize analytics
  const analytics = useAnalytics();

  const filteredProducts =
    selectedCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((product) => product.category === selectedCategory);

  // Track category changes
  useEffect(() => {
    if (selectedCategory !== 'All') {
      analytics.trackCategoryView(selectedCategory, filteredProducts.length);
    }
  }, [selectedCategory, filteredProducts.length, analytics]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    // Track add to cart event
    analytics.trackAddToCart(product, 1);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: number) => {
    const itemToRemove = cartItems.find((item) => item.id === id);
    if (itemToRemove) {
      analytics.trackRemoveFromCart(itemToRemove);
    }
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={styles.app}>
      <Header
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
        onCategoryClick={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      <Hero />

      <main className={styles.main}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {selectedCategory === 'All' ? 'All Products' : selectedCategory}
          </h2>
          <p className={styles.subtitle}>
            {filteredProducts.length} products available
          </p>
        </div>

        <div className={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}
