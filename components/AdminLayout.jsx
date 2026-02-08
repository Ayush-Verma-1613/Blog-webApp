'use client'
import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { useRouter } from 'next/navigation';

const AdminLayout = ({ children }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        message.success('Logout successful');
        router.push('/login');
      } else {
        message.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      message.error('An error occurred during logout');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-gray-800 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
            Admin Block
          </h1>
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            size="middle"
            className="text-xs sm:text-sm"
          >
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-center">
          <p className="text-xs sm:text-sm text-gray-600">
            Admin Panel ©{new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;