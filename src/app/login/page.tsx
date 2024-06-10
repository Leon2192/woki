'use client';
import React, { useState } from 'react';
import { Box, Button, Typography, useMediaQuery, TextField, Link as MuiLink } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { handleGoogleSignIn, handleEmailSignIn, handleRegisterWithEmail } from '@/utilities/authUtil';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegisterButton, setShowRegisterButton] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      await handleGoogleSignIn(dispatch);
      enqueueSnackbar('¡Bienvenido!', { variant: 'success' });
      router.push('/home');
    } catch (error:any) {
      enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' });
    }
  };

  const handleEmailLogin = async () => {
    try {
      await handleEmailSignIn(email, password, dispatch);
      enqueueSnackbar('¡Bienvenido!', { variant: 'success' });
      router.push('/home');
    } catch (error:any) {
      enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' });
    }
  };

  const handleRegister = async () => {
    try {
      await handleRegisterWithEmail(email, password, dispatch);
      enqueueSnackbar('¡Registrado exitosamente! A disfrutar tu stream', { variant: 'success' });
      router.push('/home');
    } catch (error:any) {
      enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' });
    }
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
        sx={{
          backgroundImage: 'url(/images/background1.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box
          maxWidth="sm" 
          width="100%"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            padding: isMobile ? '1rem' : '2rem',
            background: 'linear-gradient(45deg, #FF6347, #FF4500, #FF69B4)', 
            color: 'white'
          }}
        >
          <Box
            sx={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              overflow: 'hidden',
              marginBottom: '1rem',
            }}
          >
            <Image src="/images/logo.png" alt="Logo" width={100} height={100} style={{ objectFit: 'cover' }} />
          </Box>

          <Typography variant="h4" component="h1" align="center" fontWeight="bold" marginBottom="1rem">
            {!showRegisterButton ? "Login" : "Register"}
          </Typography>

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
            sx={{ marginBottom: '1rem', backgroundColor: 'white', borderRadius: '4px' }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
            sx={{ marginBottom: '1rem', backgroundColor: 'white', borderRadius: '4px' }}
          />

          <Button
            onClick={handleEmailLogin}
            disabled={loading}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginBottom: '1rem' }}
          >
            {loading ? 'Redirecting...' : 'Login with Email'}
          </Button>

          <Button
            onClick={handleGoogleLogin}
            disabled={loading}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginBottom: '1rem' }}
          >
            {loading ? 'Redirecting...' : 'Login with Google'}
          </Button>

          {showRegisterButton && (
            <Button
              onClick={handleRegister}
              disabled={loading}
              variant="outlined"
              color="secondary"
              fullWidth
            >
              {loading ? 'Registering...' : 'Register with Email'}
            </Button>
          )}

          <Typography variant="body2" align="center" sx={{ marginTop: '1rem', cursor: 'pointer' }} onClick={() => setShowRegisterButton(!showRegisterButton)}>
            ¿No tienes una cuenta aún?{' '}
            <MuiLink color="inherit" sx={{ fontWeight: 'bold' }}>
              Regístrate
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
