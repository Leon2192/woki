'use client'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default:'#b5179e',
    },
    text: {
      primary: '#ffffff', 
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: 'black',
    },
    text: {
      primary: '#ffffff', 
    },
  },
});

const CustomThemeProvider = (
    {
        children,
      }: Readonly<{
        children: React.ReactNode;
      }>
) => {
  const dispatch = useDispatch();
  const currentThemeMode = useSelector((state:RootState) => state.theme.mode);

  const theme = currentThemeMode === 'light' ? lightTheme : darkTheme;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default CustomThemeProvider;
