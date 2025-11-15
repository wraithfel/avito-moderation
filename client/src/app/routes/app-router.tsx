import { createBrowserRouter, Navigate } from 'react-router-dom';

import { LayoutApp } from '@/pages/layout';
import { StatsPageStub } from './mock-components';
import { AdsListPage } from '@/pages/ads-list';
import { AdDetailsPage } from '@/pages/ad-detail';

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
        element: <StatsPageStub />,
      },
    ],
  },
]);
