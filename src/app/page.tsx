import styles from './page.module.css';

function HomePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>HOME PAGE</h1>
      </main>
      <footer className={styles.footer}>
        <h1>FOOTER</h1>
      </footer>
    </div>
  );
}

export default HomePage;
