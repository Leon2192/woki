import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/redux/providers";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider, CssBaseline } from "@mui/material";
import CustomThemeProvider from "@/themes/CustomThemeProvider";

export const metadata: Metadata = {
  title: "Woki - Movies app",
  description: "Generated by create next app",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body>
        <Providers>
          <AppRouterCacheProvider>
            <CustomThemeProvider>
              <CssBaseline />
              {children}
            </CustomThemeProvider>
          </AppRouterCacheProvider>
        </Providers>
      </body>
    </html>
  );
}
