import { RouterProvider } from 'react-router-dom';

import { appRouter } from '../routes';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryProvider } from '../providers';
import { queryClient } from '@/shared/api';
import { theme } from '../configs';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryProvider client={queryClient}>
        <RouterProvider router={appRouter} />
      </QueryProvider>
    </ThemeProvider>
  );
};

export { App };
