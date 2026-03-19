import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Courts from './pages/Courts';
import Bookings from './pages/Bookings';
import Vouchers from './pages/Vouchers';
import Users from './pages/Users';
import Roles from './pages/Roles';
import { useSocket } from './hooks/useSocket';

const queryClient = new QueryClient();

/**
 * Wrapper component to initialize global socket listener within TanStack Query context.
 */
function SocketInit() {
  useSocket();
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SocketInit />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/courts" element={<Courts />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/vouchers" element={<Vouchers />} />
            <Route path="/users" element={<Users />} />
            <Route path="/roles" element={<Roles />} />
            {/* Fallback */}
            <Route path="*" element={<div className="text-2xl font-black uppercase text-red-500">404 - Trang không tồn tại</div>} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
