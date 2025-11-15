import { Outlet, ScrollRestoration } from 'react-router-dom';

import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

import styles from './layout.module.scss';

const LayoutApp = () => {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.layout__wrapper}>
        <ScrollRestoration />
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export { LayoutApp };
