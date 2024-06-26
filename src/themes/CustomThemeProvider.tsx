"use client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Header from "@/components/shared/Header/Header";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#fca311",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "black",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

const CustomThemeProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const dispatch = useDispatch();
  const currentThemeMode = useSelector((state: RootState) => state.theme.mode);
  const user = useSelector((state: RootState) => state.auth.user);

  const theme = currentThemeMode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      {user !== null && <Header />}
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
