import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Login from '../pages/Login';
import {Link, useNavigate} from "react-router-dom";
import "../css/SidebarRow.css";

// icons
import HomeIcon from "@mui/icons-material/Home";
import UpIcon from '@mui/icons-material/ExpandLess';
import DownIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Settings from '@mui/icons-material/Settings';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PersonIcon from '@mui/icons-material/Person';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AlarmAddIcon from '@mui/icons-material/AlarmAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Logout from '@mui/icons-material/Logout';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SettingsIcon from '@mui/icons-material/Settings';
import Img from "../images/avatar_1.jfif"
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";
import { useStateValue } from "../State/StateProvider";

const drawerWidth = 240;

function NewSidebar(props) {

  // New Sidebar States
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [{ adminToken, admin }, dispatch] = useStateValue();
  const history = useNavigate();

  // Event handlers
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

    const onLogout = () => {
      dispatch({
      type: "GET_CURRENT_ADMIN",
      item: {
        adminToken: "",
        admin: {},
      },
    });
        localStorage.setItem("auth-token", "");

      history("/");
  };


  // DropDown
  const [studentDrop, setStudentDrop] = React.useState(false);
  const [staffDrop, setStaffDrop] = React.useState(false);
  const [courseDrop, setCourseDrop] = React.useState(false);
  const [feesDrop, setFeesDrop] = React.useState(false);
  const [eventsDrop, setEventsDrop] = React.useState(false);

  // Student Section Dropdown
  const onStudentDrop = () => {
    setStudentDrop(!studentDrop);
  }
    // Staff Section Dropdown
  const onStaffDrop = () => {
    setStaffDrop(!staffDrop);
  }
    // Course Section Dropdown
  const onCourseDrop = () => {
    setCourseDrop(!courseDrop);
  }
    // Fees Section Dropdown
  const onFeesDrop = () => {
    setFeesDrop(!feesDrop);
  }
    // Events Section Dropdown
  const onEventsDrop = () => {
    setEventsDrop(!eventsDrop);
  }



  // clickEvents for header icon menu
  const [anchorEle, setAnchorEle] = React.useState(null);
  const toggle = Boolean(anchorEle);
  const openClick = (event) => {
    setAnchorEle(event.currentTarget);
  };
  const closeClick = () => {
    setAnchorEle(null);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  // Sidebar Section Objects
   const studentObject = [
    {
      path: "/register_student",
      title: "Register Student",
      icon: <PersonIcon />,
    },
    {
      path: "/view_student",
      title: "View Students",
      icon: <SearchIcon />,
    },
  //   {
  //   path: "/level",
  //   title: "Level",
  //   icon: <MeetingRoomIcon />,
  // },
  ];

     const staffObject = [
    {
      path: "/register_staff",
      title: "Register Staff",
      icon: <AddCircleIcon />,
    },
    {
      path: "/view_staff",
      title: "View Staff",
      icon: <SearchIcon />,
    },
   
  ];

  const courseObject = [
    {
      path: "/add_course",
      title: "Add Course",
      icon: <AddCircleIcon />,
    },
  ];

    const feesObject = [
    {
      path: "/set_fees",
      title: "Fee Setup",
      icon: <Settings />,
    },
    {
      path: "/pay_fees",
      title: "Fee Payment",
      icon: <AttachMoneyIcon />,
    },
    // {
    //   path: "/view_course",
    //   title: "View Courses",
    //   icon: <LocalLibraryIcon />,
    // },
   
  ];


     const eventObject = [
    {
      path: "/events",
      title: "Events",
      icon: <AlarmAddIcon />,
    },
    // {
    //   path: "/upcoming_events",
    //   title: "Upcoming Events",
    //   icon: <NotificationsActiveIcon />,
    // },
   
  ];

  // Drawer function
  const drawer = (
    <div className="sidebar_element">
      <Toolbar />

       <List>
        {['Dashboard'].map((text, index) => (
          <Link to="/dashboard" style={{textDecoration:"none"}}>

          <ListItem button key={text} style={{backgroundColor:"#f9b115", color:"white", marginBottom: -8}}>
            <ListItemIcon>
              {<HomeIcon style={{ color:"white"}}/>}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
          </Link>
        ))}
      </List>



      {/* Students Section */}
         <List>
        {['Students Section'].map((text, index) => (
          <ListItem button onClick={onStudentDrop} key={text} className="sidebarRow__section">
            <ListItemText primary={text} />
            {studentDrop ? <UpIcon /> :<DownIcon/>}
          </ListItem>
        ))}
      </List>
      <Divider />
     {studentDrop && 
      <List>
     {/*studentObject map */}
          {studentObject.map((items) => (
<Link to={items.path} style={{textDecoration:"none"}}>
        <ListItem button key={items.title} className="sidebarRow" >
          <ListItemIcon className="sidebarRow__icon">
            {items.icon}
          </ListItemIcon>
            <ListItemText primary={items.title} className="sidebarRow__title" />
        </ListItem>
          </Link>
      ))}
      </List>
     
     }
      <Divider />

      {/* Staff Section */}
         <List>
        {['Staff Section'].map((text, index) => (
          <ListItem button onClick={onStaffDrop} key={text} className="sidebarRow__section" style={{marginTop: -10}}>
            <ListItemText primary={text} />
            {staffDrop ? <UpIcon /> :<DownIcon/>}

          </ListItem>
        ))}
      </List>
      <Divider />
      {staffDrop &&
      <List>
    {/* staffObject map */}
          {staffObject.map((items) => (
      <Link to={items.path} style={{textDecoration:"none"}}>
        <ListItem button key={items.title} className="sidebarRow" >
          <ListItemIcon className="sidebarRow__icon">
            {items.icon}
          </ListItemIcon>
            <ListItemText primary={items.title} className="sidebarRow__title" />
        </ListItem>
          </Link>
      ))}
      </List>
}
      <Divider />


        {/* Course Section */}
         <List>
        {['Course Section'].map((text, index) => (
          <ListItem button onClick={onCourseDrop} key={text} className="sidebarRow__section" style={{marginTop: -10}}>
            <ListItemText primary={text} />
            {courseDrop ? <UpIcon /> :<DownIcon/>}

          </ListItem>
        ))}
      </List>
      <Divider />
      {courseDrop &&
      <List>
       {/*courseObject map  */}
          {courseObject.map((items) => (
<Link to={items.path} style={{textDecoration:"none"}}>
        <ListItem button key={items.title} className="sidebarRow" >
          <ListItemIcon className="sidebarRow__icon">
            {items.icon}
          </ListItemIcon>
            <ListItemText primary={items.title} className="sidebarRow__title" />
        </ListItem>
          </Link>
      ))}
      </List>
}
      <Divider />

            {/* Fees Section */}
         <List>
        {['Fees Section'].map((text, index) => (
          <ListItem button onClick={onFeesDrop} key={text} className="sidebarRow__section" style={{marginTop: -10}}>
            <ListItemText primary={text} />
            {feesDrop ? <UpIcon /> :<DownIcon/>}

          </ListItem>
        ))}
      </List>
      <Divider />
      {feesDrop &&
      <List>
     {/*feesObject map */}
          {feesObject.map((items) => (
<Link to={items.path} style={{textDecoration:"none"}}>
        <ListItem button key={items.title} className="sidebarRow" >
          <ListItemIcon className="sidebarRow__icon">
            {items.icon}
          </ListItemIcon>
            <ListItemText primary={items.title} className="sidebarRow__title" />
        </ListItem>
          </Link>
      ))}
      </List>
}
      <Divider />


       {/* Event Section */}
         <List>
        {['Events Section'].map((text, index) => (
          <ListItem button onClick={onEventsDrop} key={text} className="sidebarRow__section" style={{marginTop: -10}}>
            <ListItemText primary={text} />
            {eventsDrop ? <UpIcon /> :<DownIcon/>}
          </ListItem>
        ))}
      </List>
      <Divider />
      {eventsDrop &&
      <List>
        {/*eventObject map  */}
          {eventObject.map((items) => (
<Link to={items.path} style={{textDecoration:"none"}}>
        <ListItem button key={items.title} className="sidebarRow" >
          <ListItemIcon className="sidebarRow__icon">
            {items.icon}
          </ListItemIcon>
            <ListItemText primary={items.title} className="sidebarRow__title" />
        </ListItem>
          </Link>
      ))}
      </List>
}
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    // Navigation bar
    
    <Box sx={{ display: 'flex'}} className="sidebar_container">
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
          className="side__toolbar"
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <div>
          <h3 className="nav__text">SCHOOL MANAGEMENT SYSTEM</h3>
          </div>
          {/* <Typography variant="h6" noWrap component="div">
            SCHOOL MANAGEMENT SYSTEM
          </Typography> */}
          <div className="sidebar__right__icons">
            <div className="sidebar__notification">
             <Tooltip title="Check events">
             <IconButton style={{color:"white"}}>
               <IconButton
          style={{color:"white"}}
            onClick={openClick}
            size="small"
            aria-controls={open ? 'account-menus' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
             <NotificationsNoneIcon />
          </IconButton>
             
             </IconButton>
             </Tooltip>
              <Menu
        anchorEl={anchorEle}
        id="account-menu"
        open={toggle}
        onClose={closeClick}
        onClick={closeClick}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
                  <ListItemIcon>
          <AlarmAddIcon fontSize="small" /> 

                  </ListItemIcon>

          Add Event
        </MenuItem>
        <MenuItem>
                  <ListItemIcon>

          <NotificationsActiveIcon fontSize="small"/> 
          </ListItemIcon>Upcoming Events
        </MenuItem>
      </Menu>
      </div>

                  <div className="sidebar__image">
                        <IconButton>
                          <Tooltip title="Profile image">
             <Avatar alt="Travis Howard" src={Img}/>
                          </Tooltip>
              </IconButton>
              </div>

             {/* Settings */}
             <div className="sidebar__settings">
             <Tooltip title="Account settings">
          <IconButton
          style={{color:"white"}}
            onClick={handleClick}
            size="small"
            // sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
          <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar alt="Travis Howard" src={Img}/> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <Link to="/add_account" style={{textDecoration:"none", color:"black"}}>

        <MenuItem>
          <ListItemIcon>
            <PersonAddAlt1Icon fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        </Link>
        <MenuItem>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={onLogout}>
          <ListItemIcon >
            {/* <IconButton onClick={sayHi}> */}
            <Logout fontSize="small" />

            {/* </IconButton> */}
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
                   </div>


          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
       

        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
        <Drawer
        
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
           {props.page}        
      </Box>
    </Box>
  );
}

NewSidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default NewSidebar;
