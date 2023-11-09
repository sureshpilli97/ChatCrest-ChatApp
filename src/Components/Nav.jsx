import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Route, Routes } from 'react-router-dom';
import {Link} from 'react-router-dom';
import Chat from './Chat';
import Bottom from "./Bottom";
import Update from "./Update";
import Img from "./Img";
import "./Css/Chat.css";
const drawerWidth = 240;

const NavBar =(props)=> {
        const { window } = props;
        const [mobileOpen, setMobileOpen] = React.useState(false);
        
        const handleDrawerToggle = () => {
            setMobileOpen((prevState) => !prevState);
        };
        
        const drawer = (
            <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Divider />
            
            </Box>
        );
        
  const container = window !== undefined ? () => window().document.body : undefined; 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{textAlign:'center'}}
    >
      <MenuItem onClick={handleMenuClose}>Created by Suresh</MenuItem>
        <IconButton size="small" color="inherit">
          <a href="https://www.linkedin.com/in/suresh-pilli-783555254/" style={{color:'black'}}><AccountCircle/></a>
          <a href="https://www.linkedin.com/in/suresh-pilli-783555254/" style={{textDecoration:'none',marginLeft:3,color:'black'}}>About Me</a>
        </IconButton>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      style={{textAlign:'center'}}
    >
      <MenuItem onClick={handleMenuClose}>Created by Suresh</MenuItem>
        <IconButton size="small" color="inherit">
          <a href="https://www.linkedin.com/in/suresh-pilli-783555254/" style={{color:'black'}}><AccountCircle/></a>
          <a href="https://www.linkedin.com/in/suresh-pilli-783555254/" style={{textDecoration:'none',marginLeft:3,color:'black'}}>About Me</a>
        </IconButton>
    </Menu>
  );
  
  return (
    <Box sx={{ display: 'flex' }} className='nav'>
      <React.Fragment>
      <CssBaseline />
      <AppBar  component="nav" style={{backgroundColor:'black'}}>
        <Toolbar>
        <Link to="/img" style={{marginTop:5}} >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <Avatar src='https://i.pinimg.com/474x/3c/0e/7e/3c0e7eef9b956deacb24f9dfcd213be4.jpg'/>
        </IconButton>
        </Link>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 0 }}
        >
          <Typography fontFamily={"Times New Roman"} style={{fontSize:22}}>
            ChatCrest
          </Typography>
        </IconButton>
        
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' ,margin:0} }}>
          <IconButton size="small" color="inherit" style={{marginRight:15}}>
          <Link to="/Update" style={{marginTop:5}} >
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path fill='#fff' d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
            </Link>
          </IconButton>
          <IconButton size="small" color="inherit" style={{marginRight:15}}>
          <Link to="/Update" style={{marginTop:5}} >
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path fill='#fff' d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"/></svg>
            </Link>
          </IconButton>
        
          <IconButton
            size="small"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="MoreVertIcon"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' ,margin:0} }}>
        <IconButton size="small" color="inherit" style={{marginRight:5}}>
          <Link to="/Update" style={{marginTop:5}} >
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path fill='#fff' d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
            </Link>
          </IconButton>
          <IconButton size="small" color="inherit" style={{marginRight:1}}>
          <Link to="/Update" style={{marginTop:5}} >
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path fill='#fff' d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"/></svg>
            </Link>
          </IconButton>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Routes>
          <Route path='/' element={<Chat />} />
          <Route path='/img' element={<Img />} />
          <Route path='/update' element={<Update/>} />
      </Routes>
      <Bottom/>
      </React.Fragment>
    </Box>
  );
}

export default NavBar;