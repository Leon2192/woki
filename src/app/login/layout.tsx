"use client"
import React from 'react';
import  { SnackbarProvider } from 'notistack'

const Layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <SnackbarProvider
    maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
    <div
      style={{
        backgroundImage: `url('/images/background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
    </SnackbarProvider>
  );
};

export default Layout;
