import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';

import { required, email } from '../../util/validators';

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
          validators: [required, email]
        },
        formIsValid: false,    
      }
  
    };
  }

  inputChangeHandler = (input, value) => {
    
    this.setState(prevState => {
      
      let isValid = true;
      
      for (var validator of prevState.loginForm[input].validators) {
        isValid = isValid && validator(value);
      }
      
      const updatedForm = {
        ...prevState.loginForm,
        [input]: {
          ...prevState.loginForm[input],
          valid: isValid,
          value: value
        }
      };

      let formIsValid = true;

      for (var inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      
      return {
        loginForm: updatedForm,
        formIsValid: formIsValid
      };

    });
  };

  inputBlurHandler = input => {    
    this.setState(prevState => {
      return {
        loginForm: {
          ...prevState.loginForm,
          [input]: {
            ...prevState.loginForm[input],
            touched: true
          }
        }
      };
    });
  };

  render() {

    return (
      
      <Auth>

        <div className="center header">      
          <h2>Log In to { this.state.companyName } Dashboard</h2>
        </div>

        <form className="auth-form"
          onSubmit={ e =>
            this.props.onLogin(e, {
              email: this.state.loginForm.email.value
            })
          }
        >
          
          <Input
            id="email"
            label="Email"
            type="email"
            control="input"
            placeholder="what's your email..?"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, 'email')}
            value={this.state.loginForm['email'].value}
            valid={this.state.loginForm['email'].valid}
            touched={this.state.loginForm['email'].touched}
          />
         
          <div className="center">
            <div>
            <Link to="/confirmLogin">
              <Button design="raised" type="submit" loading={ this.props.loading } style ={{width: '160px', fontSize: '18px'}} >
                Login
              </Button>
            </Link> 
            </div>
          </div> 
        </form>
      </Auth>
    );

  }
}

export default Login;