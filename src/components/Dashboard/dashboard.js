import React from 'react';
import clsx from 'clsx';
import { BrowserRouter , Route, Link , Switch} from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import logo from '../../logo.png';
import NavbarBrand from 'react-bootstrap/NavbarBrand';

import './dashboard.css';
<<<<<<< HEAD
import Inbox from './inbox';
import DataTable from '../../containers/DataTable/Datatable';
import MakeYourChoice from '../mkyourchoice/choice';
=======

import Inbox from './inbox'
>>>>>>> 7561d05cad1011d99f1a474743773bc6a563ce4f

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  color: {
    backgroundColor: '#18264f',
  }
}));

export default function Dashboard() {

  const classes = useStyles();
  const theme = useTheme();
  const [ open, setOpen ] = React.useState(false);
  const [ open1, setOpen1 ] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }
  function handleClick() {
    setOpen1(!open1);
  }

  return (
    
    <div className={classes.root}>
    
      <CssBaseline />
      
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        
        <Toolbar>
        
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
         
            <MenuIcon />
          </IconButton>

          <NavbarBrand to="/home" >
            <img src={logo} className="imgStyle" alt="Logo"/>
          </NavbarBrand>

        </Toolbar>

      </AppBar>
      
      <BrowserRouter>
      
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>

        <Divider />
        
        <List>
          {[
            {
              text:'Inbox',
              to:'/inbox',
              nested:{
                text: "Nested",
                to: "/nested"
              }
            },
            {
              text: 'Starred',
              to:'/starred'
            },
            { text:'Send email',
              to:'sendmail'
            },
            {
              text:'Drafts',
              to:'/drafts'
            }
              ].map((link, index) => (
                link.text === "Inbox"?
                
                <div >
                  <Link to={link.to} key={link.text + index}>
                    <ListItem button onClick={handleClick} >
                      <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                      <ListItemText primary={link.text} />
                      {open1 ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                  </Link>
                
                 <Collapse in={open1} timeout="auto" unmountOnExit>
                   
                 <List component="div" disablePadding>
      
                 <Link to={link.nested.to} key={link.nested.text}> 
             
                   <ListItem button className={classes.nested}>
                     <ListItemIcon>
                       <StarBorder />
                     </ListItemIcon>
             
                     <ListItemText primary="Starred" />
             
                   </ListItem>
             
                   </Link>
             
                 </List>
      
               </Collapse>
             
               </div>
                  :
                <Link to={link.to} key={link.text + index}>
    
              <ListItem button >
              
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              
                <ListItemText primary={link.text} />
                          
              </ListItem>
              
            </Link>
          ))}
        </List>
        
        <Divider />
        
        <List>
          {[
            {
              text:'All mail',
              to:'/allmail',
            },
            {
              text:'Trash',
              to:'/trash',
            },
            {
              text:'Spam',
              to:'/spam',
            },
          ].map((link, index) => (
        
            <Link to={link.to} key={link.text + index}>
            
              <ListItem button >
            
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            
                <ListItemText primary={link.text} />
            
              </ListItem>
            
            </Link>
          ))}

        </List>
      
      </Drawer>
      
        <Switch>
          <Route path='/inbox' exact component={Inbox}  />
          {/* <Route path='/starred' component={MakeYourChoice,DataTable} /> */}
          <Route path='/starred' render={props =>
                    <div>
                      <MakeYourChoice />
                      <DataTable />
                    </div>
          }/>

          <Route path='/sendmail' component={MakeYourChoice} />
          <Route path='/drafts' />
        </Switch>
      
      </BrowserRouter>
      
      <main className={classes.content}>
      
        <div className={classes.toolbar} />
        
      </main>
    
    </div>
  );
}
