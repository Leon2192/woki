'use client';
import React from 'react';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { handleGoogleSignIn, handleLogout } from '@/utilities/authUtil';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';

const LoginPage = () => {
  const loading = useSelector((state: RootState) => state.auth.isLoading);
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleLogin = async () => {
    await handleGoogleSignIn(dispatch);
    enqueueSnackbar('¡Bienvenido!', { variant: 'success' });
    router.push('/home');
  };

  return (
    <>
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        py={isMobile ? 6 : 12}
        px={4}
        width="100%"
      >
        <Box
          maxWidth="md"
          width="100%"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            border: '2px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            padding: isMobile ? '1rem' : '2rem',
            backgroundImage: 'linear-gradient(45deg, #9333ea, #be123c)',
          }}
        >
          <Box
            sx={{
              width: isMobile ? '150px' : '200px',
              height: isMobile ? '150px' : '200px',
              borderRadius: '50%',
              overflow: 'hidden',
              marginBottom: isMobile ? '0.5rem' : '1rem',
            }}
          >
            <Image src="/images/logo.png" alt="Logo" width={200} height={200} style={{ objectFit: 'cover' }} />
          </Box>

          <Typography variant="h4" component="h2" align="center" fontWeight="bold">
            Welcome!
          </Typography>
          <Typography variant="h6" component="h2" align="center" fontWeight="bold" color="textPrimary">
            All your movies, in one place
          </Typography>

          <Button
            onClick={handleLogin}
            disabled={loading}
            variant="contained"
            color="primary"
            sx={{ width: isMobile ? '100%' : '75%' }}
          >
            {loading ? 'Redirecting...' : 'Login'}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
