import styles from './Header.module.scss';
import logoSrc from '@/assets/logo.svg';

function Header() {
  return (
    <>
      <header className={styles.header}>
        <img className={styles.logo} alt="Show Me The Money logo" src={logoSrc} />
        <h1 className={styles.title}>Show Me The Money!</h1>
      </header>
    </>
  );
}

export default Header;
