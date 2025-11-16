import { Avatar, Skeleton, Button, IconButton, Tooltip } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import { useGetCurrentModerator } from '@/entities/moderator';

import styles from './header.module.scss';
import { getInitials } from '@/shared/utils';
import { useAppTheme } from '@app/providers';
import { DarkMode, LightMode } from '@mui/icons-material';

const Header = () => {
  const { data: moderator, isLoading, isError } = useGetCurrentModerator();
  const location = useLocation();

  const isStatsPage = location.pathname.startsWith('/stats');
  const statsButtonLabel = isStatsPage ? 'На главную' : 'Моя статистика';
  const statsButtonTo = isStatsPage ? '/list' : '/stats';

  const { mode, toggleMode } = useAppTheme();
  const themeToggleLabel = mode === 'dark' ? 'Светлая тема' : 'Тёмная тема';

  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <Link to='/list' className={styles.header__logo}>
          <div className={styles.header__logoDots}>
            <span className={`${styles.header__dot} ${styles.header__dot_blue}`} />
            <span className={`${styles.header__dot} ${styles.header__dot_red}`} />
            <span className={`${styles.header__dot} ${styles.header__dot_green}`} />
          </div>
          <div className={styles.header__logoTextBlock}>
            <span className={styles.header__logoText}>Avito</span>
            <span className={styles.header__logoSub}>Moderation System</span>
          </div>
        </Link>

        <div className={styles.header__moderator}>
          <Button
            component={Link}
            to={statsButtonTo}
            variant='outlined'
            size='small'
            color='primary'
            className={styles.header__statsButton}
          >
            {statsButtonLabel}
          </Button>

          <Tooltip title={themeToggleLabel}>
            <IconButton
              size='small'
              color='inherit'
              aria-label={themeToggleLabel}
              onClick={toggleMode}
            >
              {mode === 'dark' ? <LightMode fontSize='small' /> : <DarkMode fontSize='small' />}
            </IconButton>
          </Tooltip>

          {isLoading && (
            <>
              <Skeleton variant='circular' width={36} height={36} />
              <div className={styles.header__moderatorInfo}>
                <Skeleton width={140} height={18} />
                <Skeleton width={110} height={14} />
              </div>
            </>
          )}

          {!isLoading && isError && (
            <span className={styles.header__error}>Не удалось загрузить модератора</span>
          )}

          {!isLoading && !isError && moderator && (
            <>
              <Avatar className={styles.header__avatar}>{getInitials(moderator.name)}</Avatar>
              <div className={styles.header__moderatorInfo}>
                <span className={styles.header__moderatorName}>{moderator.name}</span>
                <span className={styles.header__moderatorRole}>{moderator.role}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export { Header };
