import { createBrowserRouter, Navigate, useParams } from 'react-router-dom';
import App from './App';
import { pocRegistry } from './registry/pocRegistry';
import HomePage from './pages/HomePage';

function PocRoute() {
  const { pocId } = useParams<{ pocId: string }>();
  const entry = pocRegistry.find((poc) => poc.id === pocId);

  if (!entry) {
    return <Navigate to="/" replace />;
  }

  const Component = entry.Component;
  return <Component />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'pocs/:pocId', element: <PocRoute /> },
    ],
  },
]);
