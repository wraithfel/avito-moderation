import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import styles from './error-boundary.module.scss';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Тут можно прикрутить Sentry / логирование
    console.error('Uncaught error in ErrorBoundary:', error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.href = '/list';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundary}>
          <div className={styles.errorBoundary__card}>
            <Typography variant='h6' className={styles.errorBoundary__title}>
              Что-то пошло не так
            </Typography>
            <Typography variant='body2' className={styles.errorBoundary__text}>
              Произошла непредвиденная ошибка интерфейса.
              <br />
              Попробуйте вернуться к списку объявлений или обновить страницу.
            </Typography>

            <div className={styles.errorBoundary__actions}>
              <Button variant='contained' color='primary' component={RouterLink} to='/list'>
                На главную
              </Button>
              <Button variant='outlined' color='inherit' onClick={this.handleReload}>
                Обновить страницу
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
