import { useMemo, useState } from 'react';
import styles from './ad-details-widget.module.scss';
import type { AdGalleryProps } from '../model/types';

export const AdGallery = ({ title, category, images }: AdGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const preparedImages = useMemo(() => {
    if (!images || images.length === 0) {
      return [
        `https://placehold.co/800x400/2b2b2b/8f8f8f?text=${encodeURIComponent(
          category || 'Объявление',
        )}`,
      ];
    }
    return images;
  }, [images, category]);

  const mainImage = preparedImages[Math.min(selectedIndex, preparedImages.length - 1)];

  return (
    <div className={styles.details__gallery}>
      <div className={styles.details__mainImageWrapper}>
        <img src={mainImage} alt={title} className={styles.details__mainImage} loading='lazy' />
      </div>

      {preparedImages.length > 1 && (
        <div className={styles.details__thumbnails}>
          {preparedImages.map((img, index) => {
            const isActive = index === selectedIndex;
            return (
              <button
                key={img + index}
                type='button'
                className={`${styles.details__thumb} ${
                  isActive ? styles.details__thumb_active : ''
                }`}
                onClick={() => setSelectedIndex(index)}
              >
                <img
                  src={img}
                  alt={`${title} ${index + 1}`}
                  className={styles.details__thumbImage}
                  loading='lazy'
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
