import { AdsListWidget } from '@/widgets';
import styles from './ads-list-page.module.scss';

const AdsListPage = () => {
  return (
    <section className={styles.page}>
      <AdsListWidget />
    </section>
  );
};

export { AdsListPage };
