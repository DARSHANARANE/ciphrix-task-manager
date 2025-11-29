import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/Layout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import AddEditTask from './pages/AddEditTask';
import ProtectedRoute from './components/ProtectedRoute';

export default function App(){
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/tasks/new" element={<ProtectedRoute><AddEditTask /></ProtectedRoute>} />
                <Route path="/tasks/:id/edit" element={<ProtectedRoute><AddEditTask /></ProtectedRoute>} />
                <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
