import { Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import styles from './ad-details-widget.module.scss';
import type { AdDescriptionProps } from '../model/types';

export const AdDescription = ({ description, characteristics }: AdDescriptionProps) => {
  const hasCharacteristics = Object.keys(characteristics ?? {}).length > 0;

  return (
    <article className={styles.details__description}>
      <Typography variant='subtitle2' gutterBottom>
        Описание
      </Typography>
      <Typography variant='body2'>{description}</Typography>

      {hasCharacteristics && (
        <div className={styles.details__characteristics}>
          <Typography variant='subtitle2' gutterBottom>
            Характеристики
          </Typography>

          <Table size='small'>
            <TableBody>
              {Object.entries(characteristics).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell component='th' scope='row' sx={{ width: '40%', borderBottom: 'none' }}>
                    <Typography variant='body2' color='text.secondary'>
                      {key}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>
                    <Typography variant='body2'>{value}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </article>
  );
};
