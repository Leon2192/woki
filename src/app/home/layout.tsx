"use client";

import MovieSlider from "@/components/ui/MovieSlider";
import ProtectedRoute from "@/utilities/routesUtil";
import { SnackbarProvider } from "notistack";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <MovieSlider />
      {children}
    </SnackbarProvider>
    </ProtectedRoute>
  );
}
