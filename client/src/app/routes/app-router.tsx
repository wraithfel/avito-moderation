import { createBrowserRouter } from 'react-router-dom';
import { AdDetailsPageStub, AdsListPageStub, StatsPageStub } from './mock-components';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AdsListPageStub />,
  },
  {
    path: '/ads',
    element: <AdsListPageStub />,
  },
  {
    path: '/ads/:id',
    element: <AdDetailsPageStub />,
  },
  {
    path: '/stats',
    element: <StatsPageStub />,
  },
]);
