'use client'
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { SnackbarProvider } from "notistack";

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <>
    <Provider store={store}>
    <SnackbarProvider
    maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {children}
      </SnackbarProvider>
      </Provider>;
    </>
  )
}
