"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  TextField,
  Link as MuiLink,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  handleGoogleSignIn,
  handleEmailSignIn,
  handleRegisterWithEmail,
} from "@/utilities/authUtil";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import Loader from "@/components/ui/Loader/Loader";

const LoginPage = () => {
  const loading = useSelector((state: RootState) => state.auth.isLoading);
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegisterButton, setShowRegisterButton] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      await handleGoogleSignIn(dispatch);
      enqueueSnackbar("¡Bienvenido!", { variant: "success" });
      router.push("/home");
    } catch (error: any) {
      enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
    }
  };

  const handleEmailLogin = async () => {
    try {
      if (!email.trim() || !password.trim()) {
        throw new Error("Por favor, completa todos los campos.");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Por favor, introduce un correo electrónico válido.");
      }

      await handleEmailSignIn(email, password, dispatch);
      enqueueSnackbar("¡Bienvenido!", { variant: "success" });
      router.push("/home");
    } catch (error: any) {
      enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
    }
  };

  const handleRegister = async () => {
    try {
      if (!email.trim() || !password.trim()) {
        throw new Error("Por favor, completa todos los campos.");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Por favor, introduce un correo electrónico válido.");
      }

      await handleRegisterWithEmail(email, password, dispatch);
      enqueueSnackbar("¡Registrado exitosamente! A disfrutar tu stream", {
        variant: "success",
      });
      router.push("/home");
    } catch (error: any) {
      enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
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
          backgroundImage: "url(/images/background1.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {loading ? (
          <Loader />
        ) : (
          <Box
            maxWidth="sm"
            width="100%"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              padding: isMobile ? "1rem" : "2rem",
              background: "linear-gradient(45deg, #00203FFF, #006EDF)",
              color: "white",
            }}
          >
            <Box
              sx={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                overflow: "hidden",
                marginBottom: "1rem",
              }}
            >
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={100}
                height={100}
                style={{ objectFit: "cover" }}
              />
            </Box>

            <Typography
              variant="h4"
              component="h1"
              align="center"
              fontWeight="bold"
              marginBottom="1rem"
            >
              {!showRegisterButton ? "Login" : "Register"}
            </Typography>

            <Box sx={{ width: "100%" }}>
              <Typography
                variant="body1"
                sx={{ color: "white", marginBottom: "0.5rem" }}
              >
                Email
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{ style: { color: "white" } }}
                sx={{ marginBottom: "1rem", borderRadius: "4px" }}
              />
            </Box>
            <Box sx={{ width: "100%" }}>
              <Typography
                variant="body1"
                sx={{ color: "white", marginBottom: "0.5rem" }}
              >
                Password
              </Typography>
              <TextField
                variant="outlined"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{ style: { color: "white" } }}
                sx={{ marginBottom: "1rem", borderRadius: "4px" }}
              />
            </Box>
            {!showRegisterButton && (
              <Button
                onClick={handleEmailLogin}
                disabled={loading}
                variant="contained"
                color="primary"
                fullWidth
                startIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                }
                sx={{ marginBottom: "1rem" }}
              >
                Login
              </Button>
            )}
            {showRegisterButton && (
              <Button
                onClick={handleRegister}
                disabled={loading}
                variant="outlined"
                color="secondary"
                fullWidth
                startIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                }
              >
                Register account
              </Button>
            )}

            <Button
              onClick={handleGoogleLogin}
              disabled={loading}
              variant="contained"
              color="primary"
              fullWidth
              startIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
                  />
                </svg>
              }
              sx={{ marginBottom: "1rem" }}
            >
              Login with Google
            </Button>

            <Typography
              variant="body2"
              align="center"
              sx={{ marginTop: "1rem", cursor: "pointer" }}
              onClick={() => setShowRegisterButton(!showRegisterButton)}
            >
              {showRegisterButton
                ? "¿No tienes una cuenta aún? Registrate"
                : "Ya tienes una cuenta? Inicia sesion"}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export default LoginPage;
