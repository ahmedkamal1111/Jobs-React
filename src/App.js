import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import * as actions from './store/actions/index';

import axios from 'axios';
import { Switch ,Route, Redirect } from 'react-router-dom';
import LoginPage from './containers/Auth/Login';
import ErrorHandler from './components/ErrorHandler/ErrorHandler';
import Backdrop from './components/Backdrop/Backdrop';
import PinLogin from './containers/Auth/PinLogin';
import ConfirmLogin from './containers/Auth/ConfirmLogin';
import Dashboard from './components/Dashboard/dashboard';
import Joinus from './components/ApplyasCandi/joinus/joinus';
import JobDetails from './components/ApplyasCandi/JobDetails/JobDetails';
import JobForm from './components/ApplyasCandi/jobs_form/jobs_form';

class App extends Component {
  
  constructor(props) {
    super( props )
    this.state = {
      showBackdrop: false,
      isAuth: false,
    };
  }

  componentDidMount() {
   
    //Get data authentication from localStorage
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    const adminId = localStorage.getItem('adminId');

    //Check in data existing
    if ( !token && !expiryDate ) {
      return;
    }

    //Check in expiry Date if expiry data is 0 or less than 0 
    //It return true and logout else skip
    if ( new Date( expiryDate ) <= new Date() ) {
      this.logout(); //logout
      return;
    }
    
    //Get the time remaining in seconds
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();

    //update state
    this.setState(prev => ({ 
        ...prev, 
        setAuth: true, 
        token: token, 
        adminId: adminId
    }));

    //set auto Logout depend on time remaining
    this.autoLogout(remainingMilliseconds);

  }

  //Logout Func
  logout = () => {
    
    //update state
    this.setState(prev => (
      {...prev, isAuth: false ,token: null, adminId: null}
    ));

    //Remove date authentication from localstorage
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('adminId');
  
  }
  
  //autoLogout Func
  autoLogout = remainingMilliseconds => {
    setTimeout( this.logout() , remainingMilliseconds );
  }

  login = (event ,authData) => {
    
    event.preventDefault();
    
    //Update state to fire spinner
    this.setState(prev => ({...prev, email: authData.email, authLoading: true }));

    axios.post('https://joblaravel.tbv.cloud/entermail',
      {
        email: authData.email,
      })
      .then(res => {
        
        //Handle Response Status
        if( res.status === 422 ) {
          throw new Error("Validation Failed.");
        } 

        //Response is success      
        if ( res.status === 200 ) {
          this.setState(prev => ({
            ...prev,
            authorize: res.data,
            authLoading: false
          }));
        }
      }) 
      .catch(err => 
         //update state with initial errors
        this.setState(prev => ({
          ...prev,
          isAuth: false,
          token: null,
          userId: null,
          authLoading: false,
          error: err,
          authorize: null
        }))
      );
  }

  //Login Func
  confirmlogin = (event, authData) => {

    event.preventDefault();

    //Update state to fire spinner
    this.setState({ authLoading: true });

    //Post data authentication to login onto the system
    axios.post("https://joblaravel.tbv.cloud/login", 
      { 
        email: this.state.email,
        pw: authData.password    
      }
    )
      .then(res => {
        
        if( res.status === 422 ) {
          throw new Error("Validation Failed.");
        }
         console.log(res);

        if ( res.status === 200 || res.status === 201 ) {
          if (res.data === -1) {
            throw new Error("Invalid email or Password");
          }
          //udpate state with initial data
          this.setState(prev => ({
            ...prev,
            isAuth: true,
            authLoading: false,
            token: res.data[0].api_token,
            userId: res.data[0].usr_id,
            authorize: null,
            CID: res.data[0].CID
          }));
        }

        //Set data authentication onto localStorage
        //localStorage.setItem('token', res.data.token);
        //localStorage.setItem('adminId', res.data.adminId);

        //set remaining time
        //const remainingMilliseconds = 60 * 60 * 1000; //Minutes * seconds * Milliseconds
        
        //Set expiryDate in localStorage
        //const expiryDate = new Date( new Date().getTime() + remainingMilliseconds );
        //localStorage.setItem('expiryDate', expiryDate.toISOString());

        //auto logout depend on time remaining
        //this.autoLogout(remainingMilliseconds);

      })
      .catch(err => {
        
        //update state with initial errors
        this.setState(prev => ({
          ...prev,
          isAuth: false,
          token: null,
          userId: null,
          authLoading: false,
          error: err,
          authorize: null
        }));
      })
      console.log(this.state.error);
  }

    //Login Func
    createPass = (event, authData) => {

      event.preventDefault();
  
      //Update state to fire spinner
      this.setState({ authLoading: true });
      
      //Post data authentication to login onto the system
      axios.post("https://joblaravel.tbv.cloud/ResetPassword", { 
        email:  this.state.email,
        PIN: authData.pin,
        pw: authData.password,
      })
        .then(res => {
          
          // Handle Response Status
          // if( res.status === 422 ) {
          //   throw new Error("Validation Failed.");
          // } 
          
          // if ( res.status !== 200 || res.status !== 201 ) {
          //   throw new Error("Could not authenticate yet, you should input the right password or email");
          // }
        
          //udpate state with initial data
          this.setState(prev => ({
            ...prev,
            isAuth: true,
            authLoading: false,
            token: res.data[0].api_token,
            userId: res.data[0].usr_id,
            authorize: null,
            CID: res.data[0].CID
          }));
          
          //Set data authentication onto localStorage
          //localStorage.setItem('token', res.data.token);
          //localStorage.setItem('adminId', res.data.adminId);
  
          //set remaining time
          //const remainingMilliseconds = 60 * 60 * 1000; //Minutes * seconds * Milliseconds
          
          //Set expiryDate in localStorage
          //const expiryDate = new Date( new Date().getTime() + remainingMilliseconds );
          //localStorage.setItem('expiryDate', expiryDate.toISOString());
  
          //auto logout depend on time remaining
          //this.autoLogout(remainingMilliseconds);
  
        })
        .catch(err => {
          
          //update state with initial error
          this.setState(prev => ({
            ...prev,
            isAuth: false,
            token: null,
            userId: null,
            authLoading: false,
            error: err,
            authorize: null
          }));
        })
  }

  //Login Func
  createPin = ( event ) => {

    event.preventDefault();

    //Update state to fire spinner
    this.setState(prev => ({...prev, authLoading: true }));
    
    //Post data authentication to login onto the system
    axios.post("https://joblaravel.tbv.cloud/createPin", { 
      email:  this.state.email,
      CID: this.props.CID
    })
      .then(res => {
        this.setState(prev => ({
          ...prev,
          authLoading: false,
          authorize: res.data
        }));
      })
      .catch(err => {
        //update state with initial errors
        this.setState(prev => ({
          ...prev,
          isAuth: false,
          authLoading: false,
          error: err,
          email: "",
          authorize: null
        }));
    })
  }

  errorHandler = () => {
    this.setState( prev => ({ ...prev, error: null }) );
  };

  backdropClickHandler = () => {
    this.setState({ showBackdrop: false, error: null });
  };

  render () {

    let routes = (

      <Switch>
        <Route path="/jobs/:cid/:id/job-detail" component={JobDetails} />
        <Route path="/jobs/:cid/:id/job-detail/job-form" component={JobForm} />
        <Route path="/aa/:anything/login" render={props => ( <LoginPage {...props} onLogin={this.login} loading={this.state.authLoading} />)} />
        <Route path="/aa/:anything" exact component={Joinus} />
        <Redirect to="/aa/:anything" />
      </Switch>
    );

    if ( (!this.state.isAuth) && (this.state.authorize === 0 || this.state.authorize === 1)) {
      routes = (
        <Switch>
          <Route
            path="/aa/:anything/login"
            render={props => (
              <ConfirmLogin
                {...props}
                confirmlogin={this.confirmlogin}
                loading={this.state.authLoading}
              />
            )}
          />
        </Switch>
      );
    } else if ( (!this.state.isAuth) && this.state.authorize === 2 ) {
      routes = (
        <Switch>
          <Route
            path="/aa/:anything/login"
            render={props => (
              <PinLogin
                {...props}
                createAcc={this.createPass}
                loading={this.state.authLoading}
              />
            )}
          />
        </Switch>
      );   
    } else if ( this.state.isAuth && this.state.userId) {
      routes = (
        <Switch>
          <Route
            path="aa/:anything/dashboard"
            render={props => ( <Dashboard admin={this.state.admin} logout={this.logout} /> )}
          />
          <Redirect to="/aa/:anything" />
        </Switch>
      );
    }
    return (
      <Fragment>

        { this.state.showBackdrop && (
          <Backdrop onClick={ this.backdropClickHandler } />
        )}
      
        <ErrorHandler error={ this.state.error } handleError={ this.errorHandler } />

        {routes}

      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.tiken !== null,
    authorize: state.auth.authorize 
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAuth: () => dispatch( actions.checkAuthState() ),
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( App );