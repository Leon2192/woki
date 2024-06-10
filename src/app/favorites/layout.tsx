'use client'

import  { SnackbarProvider } from 'notistack'


export default function Layout(
    {
        children,
      }: Readonly<{
        children: React.ReactNode;
      }>
) {
 
  return (
  
    <SnackbarProvider 
    maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {children}
    </SnackbarProvider>
    
  );
}
