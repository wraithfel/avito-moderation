import { createBrowserRouter, Navigate } from 'react-router-dom';

import { LayoutApp } from '@/pages/layout';
import { AdDetailsPageStub, AdsListPageStub, StatsPageStub } from './mock-components';

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
        element: <AdsListPageStub />,
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
