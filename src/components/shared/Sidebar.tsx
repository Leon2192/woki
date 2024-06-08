import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchMovies from './MovieSearch';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function Sidebar() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350,
        backgroundColor: 'transparent', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Alinea los elementos verticalmente en el espacio entre ellos
        height: '100%', // Establece la altura del contenedor
      }}
      role="presentation"
    >
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '16px', paddingBottom: '16px' }}> {/* Mover el botón al lado derecho */}
          <Button onClick={toggleDrawer(anchor, false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </Button>
        </Box>
        <SearchMovies />
        <Divider />
      </Box>
      <List>
        <ListItem key="Profile" disablePadding>
          <ListItemButton>
            <ListItemIcon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
         </ListItemIcon> 
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Account" disablePadding>
          <ListItemButton>
            <ListItemIcon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
              </ListItemIcon> 
            <ListItemText primary="Account" />
          </ListItemButton>
        </ListItem>
        <ListItem key="LogIn" disablePadding>
          <ListItemButton>
            <ListItemIcon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>

              </ListItemIcon> {/* Agregar icono a la izquierda de Log in */}
            <ListItemText primary="Log in" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={toggleDrawer('right', true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </Button>
      </Box>
      <SwipeableDrawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}
      >
        {list('right')}
      </SwipeableDrawer>
    </div>
  );
}
