import { createBrowserRouter, Navigate } from 'react-router-dom';

import { LayoutApp } from '@/pages/layout';
import { AdDetailsPageStub, StatsPageStub } from './mock-components';
import { AdsListPage } from '@/pages/ads-list';

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
        element: <AdDetailsPageStub />,
      },
      {
        path: 'stats',
        element: <StatsPageStub />,
      },
    ],
  },
]);
