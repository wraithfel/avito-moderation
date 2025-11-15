import { Avatar, Skeleton } from '@mui/material';

import { useGetCurrentModerator } from '@/entities/moderator/api';

import styles from './header.module.scss';
import { getInitials } from '@/shared/utils';

const Header = () => {
  const { data: moderator, isLoading, isError } = useGetCurrentModerator();

  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <div className={styles.header__logo}>
          <div className={styles.header__logoDots}>
            <span className={`${styles.header__dot} ${styles.header__dot_blue}`} />
            <span className={`${styles.header__dot} ${styles.header__dot_red}`} />
            <span className={`${styles.header__dot} ${styles.header__dot_green}`} />
          </div>
          <div className={styles.header__logoTextBlock}>
            <span className={styles.header__logoText}>Avito</span>
            <span className={styles.header__logoSub}>Moderation System</span>
          </div>
        </div>

        <div className={styles.header__moderator}>
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
