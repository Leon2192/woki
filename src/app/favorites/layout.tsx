"use client";
import MovieSlider from "@/components/ui/MovieSlider/MovieSlider";
import ProtectedRoute from "@/utilities/routesUtil";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <MovieSlider />
      {children}
    </ProtectedRoute>
  );
}
