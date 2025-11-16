import { Button, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import styles from './not-found-page.module.scss';

const NotFoundPage = () => {
  const location = useLocation();

  return (
    <section className={styles.notFound} aria-label='Страница не найдена'>
      <div className={styles.notFound__content}>
        <Typography component='p' className={styles.notFound__code}>
          404
        </Typography>

        <Typography component='h1' className={styles.notFound__title}>
          Страница не найдена
        </Typography>

        <Typography variant='body2' className={styles.notFound__text}>
          Адрес <code>{location.pathname}</code> не существует или был перемещён.
          <br />
          Вернитесь к списку объявлений и продолжите модерацию.
        </Typography>

        <div className={styles.notFound__actions}>
          <Button variant='contained' color='primary' component={RouterLink} to='/list'>
            На главную
          </Button>

          <Button variant='outlined' color='inherit' onClick={() => window.history.back()}>
            Назад
          </Button>
        </div>
      </div>
    </section>
  );
};

export { NotFoundPage };
