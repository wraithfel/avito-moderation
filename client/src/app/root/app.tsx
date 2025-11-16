import { RouterProvider } from 'react-router-dom';

import { appRouter } from '../routes';
import { QueryProvider, AppThemeProvider } from '../providers';
import { queryClient } from '@/shared/api';

const App = () => {
  return (
    <AppThemeProvider>
      <QueryProvider client={queryClient}>
        <RouterProvider router={appRouter} />
      </QueryProvider>
    </AppThemeProvider>
  );
};

export { App };
