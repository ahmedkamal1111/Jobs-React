
import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './containers/Auth/Login';
import PinLogin from './containers/Auth/PinLogin';
import ConfirmLogin from './containers/Auth/ConfirmLogin';
import Dashboard from './components/Dashboard/dashboard';


class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isAuth: false,
      token: null,
      adminId: null,
      authLoading: false,
      error: null,
      authorize: null,
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
    if ( new Date(expiryDate) <= new Date() ) {
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

  login = (e ,authData) => {
    
    e.preventDefault();
    
    axios.post('https://joblaravel.tbv.cloud/entermail', authData)
      .then(res => {
        //Handle Response Status
        if( res.status === 422 ) {
          throw new Error("Validation Failed.");
        } 
        //Response is success      
        if ( res.status === 200 ) {
          this.setState(prev => ({
            ...prev,
            authorize: res.data
          }));
        }
      }) 
      .catch(err => 
         //update state with initial errors
        this.setState(prev => ({
          ...prev,
          isAuth: false,
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
    axios.post("URL", { 
      password: authData.password    
    })
      .then(res => {
        
        //Handle Response Status
        if( res.status === 422 ) {
          throw new Error("Validation Failed.");
        } 
        
        if ( res.status !== 200 || res.status !== 201 ) {
          throw new Error("Could not authenticate yet, you should input the right password or email");
        }
        
        //udpate state with initial data
        this.setState({
          isAuth: true,
          authLoading: false,
          token: res.data.token,
          adminId: res.data.adminId,
        });

        //Set data authentication onto localStorage
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('adminId', res.data.adminId);

        //set remaining time
        const remainingMilliseconds = 60 * 60 * 1000; //Minutes * seconds * Milliseconds
        
        //Set expiryDate in localStorage
        const expiryDate = new Date( new Date().getTime() + remainingMilliseconds );
        localStorage.setItem('expiryDate', expiryDate.toISOString());

        //auto logout depend on time remaining
        this.autoLogout(remainingMilliseconds);

      })
      .catch(err => {
        
        //update state with initial errors
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err
        });

      })
  }

  render () {

    let routes = (
       <Switch>
        <Route
          path="/"
          exact
          render={props => (
            <LoginPage
              {...props}
              onLogin={this.login}
              loading={this.state.authLoading}
            />
          )}
        />
      </Switch>
    );

    if ( (!this.isAuth) && (this.state.authorize === 0 || this.state.authorize === 1)) {
      routes = (
        <Switch>
          <Route
            path="/"
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
    } else if ( (!this.isAuth) && this.state.authorize === 2 ) {
      routes = (
        <Switch>
          <Route
            path="/"
            render={props => (
              <PinLogin
                {...props}
                createAcc={this.confirmlogin}
                loading={this.state.authLoading}
              />
            )}
          />
        </Switch>
      );   
    } else if (this.state.isAuth) {
      routes = (
        <Switch>
          <Route>
            <Dashboard />
          </Route>
        </Switch>
      );
    }
    return (
      <Fragment>
        {routes}
      </Fragment>
    );
  }

}

export default App;