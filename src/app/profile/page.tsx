"use client"
import React from 'react';
import { RootState } from '@/redux/store';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const Page = () => { 
  const user = useSelector((state: RootState) => state.auth.user);

  if (user !== null) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h2" gutterBottom>
          User Profile
        </Typography>
        <Typography variant="h5" gutterBottom>
          UID: {user.uid}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Display Name: {user.displayName}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Email: {user.email}
        </Typography>
      </div>
    );
  } else {
    return null; 
  }
};

export default Page;
