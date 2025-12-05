import styles from '../styles/Hero.module.css';

export function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Discover Amazing Products
          </h1>
          <p className={styles.description}>
            Shop the latest trends in electronics, fashion, home goods, and more. 
            Quality products at unbeatable prices.
          </p>
          <button className={styles.button}>
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}
