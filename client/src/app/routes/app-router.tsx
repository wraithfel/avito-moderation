import { createBrowserRouter, Navigate } from 'react-router-dom';

import { LayoutApp } from '@/pages/layout';
import { AdsListPage } from '@/pages/ads-list';
import { AdDetailsPage } from '@/pages/ad-detail';
import { StatsPage } from '@/pages/stats';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <LayoutApp />,
    children: [
      {
        index: true,
        element: <Navigate to='/list' replace />,
      },
      {
        path: 'list',
        element: <AdsListPage />,
      },
      {
        path: 'item/:id',
        element: <AdDetailsPage />,
      },
      {
        path: 'stats',
        element: <StatsPage />,
      },
    ],
  },
]);
