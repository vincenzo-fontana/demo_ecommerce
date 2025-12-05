import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import styles from '../styles/Header.module.css';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onCategoryClick: (category: string) => void;
  selectedCategory: string;
}

export function Header({ cartItemsCount, onCartClick, onCategoryClick, selectedCategory }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Sports & Fitness'];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <div className={styles.leftSection}>
            <h1 className={styles.logo}>ShopHub</h1>
            
            {/* Desktop Navigation */}
            <nav className={styles.nav}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryClick(category)}
                  className={`${styles.navButton} ${selectedCategory === category ? styles.active : ''}`}
                >
                  {category}
                </button>
              ))}
            </nav>
          </div>

          {/* Search Bar */}
          <div className={styles.searchWrapper}>
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search products..."
                className={styles.searchInput}
              />
            </div>
          </div>

          {/* Cart Button */}
          <div className={styles.rightSection}>
            <button
              onClick={onCartClick}
              className={styles.cartButton}
            >
              <ShoppingCart />
              {cartItemsCount > 0 && (
                <span className={styles.cartBadge}>
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={styles.menuButton}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <nav className={styles.mobileNav}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    onCategoryClick(category);
                    setMobileMenuOpen(false);
                  }}
                  className={`${styles.mobileNavButton} ${selectedCategory === category ? styles.active : ''}`}
                >
                  {category}
                </button>
              ))}
            </nav>
            <div className={styles.mobileSearch}>
              <div className={styles.searchContainer}>
                <Search className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search products..."
                  className={styles.searchInput}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
