import { Outlet } from 'react-router-dom';
import AppLayout from './layout/AppLayout';

// Routing is owned by router.tsx; App remains the shared nested layout shell.
export default function App() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
