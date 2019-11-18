import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';

import PulseLoader from 'react-spinners/PulseLoader';
import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';
import validate from '../../util/validation';
import Auth from './Auth';
import './Auth.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      companyName: "Teqneia",
      loginForm: {
        email: {
          value: '',
          valid: false,
          touched: false,
          validationRules: {
            isEmail: true
          },
        },
        formIsValid: false,    
      }
    };
  }

  componentDidMount() {
    this.props.onTryAuth();
  }

  inputChangeHandler = (key, value) => {
    this.setState(prevState => {
      return {
        ...prevState,
        loginForm: {
          ...prevState.loginForm,
          [key]: {
            ...prevState.loginForm[key],
            value: value,
            valid: validate(
              value,
              prevState.loginForm[key].validationRules,
            ),
            touched: true
          }
        }
      };
    });
  };

  submitHandler = ( event ) => {
    event.preventDefault();
    this.props.onLogin( this.state.loginForm.email.value );
  }

  
  render() {

    const mailValid = this.state.loginForm.email.valid;
    
    let text = "Log In";
    
    if ( this.props.loading ) {
      text = (
        <PulseLoader
          sizeUnit={"px"}
          size={10}
          color={'#FFFFFF'}
          margin="2px"
        />
      )
    }

    let authRedirect = null;
    const param = this.props.match.params.anything;

    if ( this.props.isAuthorized ) {
      authRedirect = <Redirect to={`/aa/${param}/confirmlogin`} />
    }

    if (this.props.isAuth) {
      authRedirect = <Redirect to={`/aa/${param}/dashboard`} />
    }

    if ( this.props.isNew ) {
      authRedirect = <Redirect to={`/aa/${param}/new-password`} />
    }

    return (
      
      <Auth>
        { authRedirect }
        <div className="center header">      
          <h2> Log Into My Account </h2>
        </div>
          
        <form className="auth-form"
          onSubmit={ this.submitHandler }
        >

          <Input
            id="email"
            label="Email"
            type="email"
            name="email"
            control="input"
            placeholder="ex. johan@gmail.com"
            onChange={this.inputChangeHandler}
            value={this.state.loginForm['email'].value}
            valid={this.state.loginForm['email'].valid}
            touched={this.state.loginForm['email'].touched}
          />
         
          <div className="center">
            <div>
              <Button 
                disabled={ mailValid ? false : true}
                design="raised" 
                type="submit" 
                style ={{width: '333px', fontSize: '18px', marginTop: '16px'}} 
              >
                { text }
              </Button> 
            </div>
          </div> 
        </form>
      </Auth>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.isLoading,
    isAuth: state.auth.token !== null,
    userId: state.auth.userId && true,
    isAuthorized: state.auth.authorize === 0 || state.auth.authorize === 1,
    authRedirectPath: state.auth.authRedirectPath,
    isNew: state.auth.authorize === 2,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAuth: () => dispatch( actions.checkAuthState() ),
    onLogin: (email) => dispatch(actions.login(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)( Login );