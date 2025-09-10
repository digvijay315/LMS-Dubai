import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Badge, Box, Button } from '@mui/material';
import { Search as SearchIcon, Home as HomeIcon, Notifications as NotificationsIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';

// Custom Search Bar Styling
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.5),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  border: '1px solid #000', 
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const TopBar = () => {
  return (
    <>
    <style>
        {`
        .MuiToolbar-root {
        height: 100%;
        }
        `}
    </style>
    <AppBar position="static" color="default" sx={{ boxShadow: 'none', 
    borderBottom: '1px solid #e0e0e0', 
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    height: '5rem', }}>

      <Toolbar>
        {/* Left side: Home icon */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="home"
          sx={{ mr: 2 }}
        >
          <HomeIcon />
        </IconButton>

        {/* Search Bar */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        {/* Spacer between Search and Right Section */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Right side: Create button, Notifications, Profile */}
        <Button variant="contained" color="primary" sx={{ marginRight: '10px' }}>
          Create
        </Button>

        <IconButton
          size="large"
          aria-label="show new notifications"
          color="inherit"
        >
          <Badge badgeContent={8} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    </>
  );
};

export default TopBar;
