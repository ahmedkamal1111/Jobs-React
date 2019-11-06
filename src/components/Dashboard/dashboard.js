import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Route, Link , Switch, Redirect} from 'react-router-dom';
import { connect  } from "react-redux";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as actions from '../../store/actions/index';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import WorkIcon from '@material-ui/icons/Work';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';
import BusinessIcon from '@material-ui/icons/Business';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PeopleIcon from '@material-ui/icons/People';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MailIcon from '@material-ui/icons/Mail';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Navbar from 'react-bootstrap/Navbar';
import './dashboard.css';
import Inbox from './inbox';
import MakeYourChoice from '../mkyourchoice/choice';
import Addjob from '../Form/addJob/addJob';
import Editjob from '../Form/Edit_Job/edit';
import CreateJob from '../Form/addJob/createJob';
import CreateInternship from '../Form/Internship/addIntern';
import ViewInternships from '../Form/Internship/updateIntern';
import logo from '../../logo.png';

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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  color: {
    backgroundColor: '#18264f',
  }
}));

const  Dashboard = props => {

  const classes = useStyles();
  const theme = useTheme();
  const [ open, setOpen ] = useState(false);
  const [ open1, setOpen1 ] = useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }
  function handleClick() {
    setOpen1(!open1);
  }

  const handleLogout = () => {
    props.onLogout();
  }

  useEffect(() => {
    const param = props.match.params.anything;
    props.onTryAuth();
    props.onFetchCompanyInfo(param);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const param = props.match.params.anything;
  
  let authRedirect = null;
  if( !props.isAuth && !props.userId ) {
    authRedirect = <Redirect to={`/aa/${param}/login`} />
  }
  
  return (
    
    <div className={classes.root}>
      
      { authRedirect }

      <CssBaseline />
      
      <AppBar
        position="fixed"
        className={clsx( classes.appBar, { [ classes.appBarShift ]: open })}
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

          <Link to={`/aa/${param}/dashboard`} >
            <img src={logo} className="imgStyle" alt="Logo"/>
          </Link>

        <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="float-right">
              <ul className="log">
                <li><p> Welcome {props.name} </p></li>
                <li><p className="logout" onClick={handleLogout}>Logout</p></li>
              </ul>
            </Navbar.Text>
        </Navbar.Collapse>

        </Toolbar>

      </AppBar>
      
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
              to:`/aa/${props.param}/dashboard/inbox`,
              nested:{
                text: "Nested",
                to: `/aa/${props.param}/dashboard/inbox/nested`
              }
            },
            {
              text: 'Candidates',
              to:`/aa/${props.param}/dashboard/candidates`,
              nested:{
                text: "Show all Times",
                to: `/aa/${props.param}/dashboard/candidates/nested`
              }
            },
            { text:'Jobs',
              to:`/aa/${props.param}/dashboard/jobs`,
              nested:[
                {
                  text: "Add a job",
                  to: `/aa/${props.param}/dashboard/jobs/addJob`
                },
                {
                  text: "Add Internship",
                  to: `/aa/${props.param}/dashboard/jobs/addIntern`
                },
                {
                  text: "View Jobs",
                  to: `/aa/${props.param}/dashboard/jobs/editJob`
                },
                
                {
                  text: "View Internships",
                  to: `/aa/${props.param}/dashboard/jobs/ViewInternships`
                }
              ]
            },
            {
              text:'Users',
              to:`/aa/${props.param}/dashboard/users`,
              nested:{
                text: "Nested",
                to: `/aa/${props.param}/dashboard/inbox/nested`
              }
            }
              ].map((link, index) => (
                link.text === "Inbox" ?
                
                <div >
                  <Link to={link.to} key={link.text + index}>
                    <ListItem button onClick={handleClick} >
                      <ListItemIcon>{index % 2 === 0 ? <InboxIcon fontSize={"small"}/> : <MailIcon fontSize={"small"}/>}</ListItemIcon>
                      <ListItemText primary={link.text} />
                      {open1 ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                  </Link>
                
                 <Collapse in={open1} timeout="auto" unmountOnExit>
                   
                 <List component="div" disablePadding>
      
                 <Link to={link.nested.to} key={link.nested.text}> 
             
                   <ListItem button className={classes.nested}>
                     <ListItemIcon>
                       <StarBorder fontSize={"small"}/>
                     </ListItemIcon>
             
                     <ListItemText primary="Candidates" />
             
                   </ListItem>
             
                   </Link>
             
                 </List>
      
               </Collapse>
             
               </div>
               :
               link.text === "Candidates" ?  <div>
               <Link to={link.to} key={link.text + index}>
               <ListItem button onClick={handleClick} >
                 <ListItemIcon> <PeopleIcon fontSize={"small"}/></ListItemIcon>
                 <ListItemText primary={link.text} />
                 {open1 ? <ExpandLess /> : <ExpandMore />}
               </ListItem>
             </Link>
             <Collapse in={open1} timeout="auto" unmountOnExit>
              
            <List component="div" disablePadding>
 
            <Link to={link.nested.to} key={link.nested.text}> 
        
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <ScheduleIcon fontSize={"small"}/>
                </ListItemIcon>
        
                <ListItemText primary={link.nested.text} />
        
              </ListItem>
        
              </Link>
        
            </List>
 
          </Collapse>
           </div>
           : 
           link.text === "Jobs" ?  <div>
           <Link to={link.to} key={link.text + index}>
           <ListItem button onClick={handleClick} >
             <ListItemIcon><WorkIcon fontSize={"small"}/></ListItemIcon>
             <ListItemText primary={link.text} />
             {open1 ? <ExpandLess /> : <ExpandMore />}
           </ListItem>
         </Link>
         <Collapse in={open1} timeout="auto" unmountOnExit>
          
        <List component="div" disablePadding>
                {link.nested.map(item => {
                  return (
                    <Link to={item.to} key={item.text}> 
    
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        {item.text.includes("Add") ? <AddCircleIcon fontSize={"small"}/> : <VisibilityIcon fontSize={"small"} />}
                      </ListItemIcon>
              
                      <ListItemText primary={item.text} />
              
                    </ListItem>
              
                    </Link>
                  )
                })}
       
    
        </List>

      </Collapse>
       </div>  
               :
                <Link to={link.to} key={link.text + index}>
    
              <ListItem button >
              
                <ListItemIcon><ListItemIcon ><AccountCircleIcon fontSize={"small"}/></ListItemIcon> </ListItemIcon>
              
                <ListItemText primary={link.text} />
                          
              </ListItem>
              
            </Link>
          ))}
        </List>
        
        <Divider />
        
        <List>
          {[
            {
              text:'Companies',
              to:`/aa/${props.param}/dashboard/companies`,
              nested:{
                text: "Nested",
                to: `/aa/${props.param}/dashboard/inbox/nested`
              }
            }, 
          ].map((link, index) => (
            link.text === "Logout" ? 
            
            <Link to={link.to} key={link.text + index}>
            
              <ListItem button >
            
                <ListItemIcon><ExitToAppIcon color={"secondary"} fontSize={"small"}/></ListItemIcon>
            
                <ListItemText primary={link.text} />
            
              </ListItem>
            
            </Link>
            :
            <Link to={link.to} key={link.text + index}>
            
              <ListItem button >
            
                <ListItemIcon ><BusinessIcon fontSize={"small"}/></ListItemIcon>
            
                <ListItemText primary={link.text} />
            
              </ListItem>
            
            </Link>
          ))}

        </List>
      
      </Drawer>
      
        <Switch>
          <Route path={`/aa/:company/dashboard/inbox`} exact component={ Inbox }  />
          <Route path={`/aa/:company/dashboard/candidates`} component={ MakeYourChoice } />
          
          <Route path={`/aa/:company/dashboard/jobs/editJob`} component={ Editjob } />
          <Route path={`/aa/:company/dashboard/jobs/addJob`} component={ CreateJob } />
          <Route path={`/aa/:company/dashboard/jobs/addIntern`} component={ CreateInternship } />
          <Route path={`/aa/:company/dashboard/jobs/ViewInternships`} component={ ViewInternships } />
          <Route path={`/aa/:company/dashboard/users`} />
          <Route path={`/aa/:company/dashboard/companies`} />
        </Switch>
      
    </div>
  );
}

const mapStateToProps = state => {
  return {
    param: state.company.param,
    isAuth: state.auth.token !== null,
    userId: state.auth.userId,
    name: state.auth.name,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchCompanyInfo: ( param ) => dispatch( actions.fetchCompanyInfo( param ) ),
    onTryAuth: () => dispatch( actions.checkAuthState() ),
    onLogout: () => dispatch( actions.logout() ),
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( Dashboard );