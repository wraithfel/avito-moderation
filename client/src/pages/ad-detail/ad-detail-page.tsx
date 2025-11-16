import { Navigate, useParams } from 'react-router-dom';

import { AdDetailsWidget } from '@/widgets';

const AdDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <Navigate to='/list' replace />;
  }

  const numericId = Number(id);

  if (Number.isNaN(numericId) || numericId <= 0) {
    return <Navigate to='/list' replace />;
  }

  return <AdDetailsWidget adId={numericId} />;
};

export { AdDetailsPage };
