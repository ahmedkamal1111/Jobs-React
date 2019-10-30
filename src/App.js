import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import * as actions from './store/actions/index';

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
    };
  }

  componentDidMount() {
    this.props.onTryAuth();
  }

  backdropClickHandler = () => {
    this.setState({ showBackdrop: false, error: null });
  };

  render () {

    let routes = (
      <Switch>
        <Route path="/aa/:anything/jobs/:id/apply" component={JobForm} />
        <Route path="/aa/:anything/jobs/:id" component={JobDetails} />
        <Route path="/aa/:anything/login" component={LoginPage} />
        <Route path="/aa/:anything" exact component={Joinus} />
        <Redirect to="/aa/:anything"/>
      </Switch>
    );

    if ( (!this.props.isAuth) && (this.props.authorize === 0 || this.props.authorize === 1)) {
      routes = (
        <Switch>
          <Route path="/aa/:anything/confirmlogin" component={ConfirmLogin}/>
          <Route path="/aa/:anything/login" exact component={LoginPage} />
        </Switch>
      );
    } else if ( (!this.props.isAuth) && this.props.authorize === 2 ) {
      routes = (
        <Switch>
          <Route path="/aa/:anything/new-password" component={PinLogin} />
          <Route path="/aa/:anything/login" exact component={LoginPage} />
          <Redirect to="/aa/:anything/login" />
        </Switch>
      );   
    } else if ( this.props.isAuth && this.props.userId ) {
      routes = (
        <Switch>
          <Route path="/aa/:anything/new-password" component={PinLogin} />
          <Route path="/aa/:anything/confirmlogin" component={ConfirmLogin}/>
          <Route path="/aa/:anything/dashboard" component={Dashboard} />
          <Route path="/aa/:anything/login" exact component={LoginPage} />
          <Redirect to="/aa/:anything/login" />
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
    isAuth: state.auth.token !== null,
    authorize: state.auth.authorize,
    userId: state.auth.userId && true
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAuth: () => dispatch( actions.checkAuthState() ),
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( App );