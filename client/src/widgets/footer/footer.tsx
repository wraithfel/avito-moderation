import { getCurrentYear } from '@/shared/utils';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <div className={styles.footer__left}>
          <span className={styles.footer__product}>Avito Moderation System</span>
          <span className={styles.footer__copy}>© {getCurrentYear()}</span>
        </div>

        <div className={styles.footer__right}>
          <span className={styles.footer__hint}>Тестовое задание · Frontend</span>
          <span className={styles.footer__statusDot} />
          <span className={styles.footer__statusText}>API: mock-server</span>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
