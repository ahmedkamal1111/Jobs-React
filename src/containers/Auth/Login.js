import React, { Component } from 'react';
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

  render() {

    return (
      
      <Auth>

        <div className="center header">      
          <h2> Log In to { this.state.companyName } Dashboard </h2>
        </div>

        <form className="auth-form"
          onSubmit={ e => {
            this.props.onLogin(e, { email: this.state.loginForm.email.value }) 
          }}
        >
          
          <Input
            id="email"
            label="Email"
            type="email"
            name="email"
            control="input"
            placeholder="what's your email..?"
            onChange={this.inputChangeHandler}
            value={this.state.loginForm['email'].value}
            valid={this.state.loginForm['email'].valid}
            touched={this.state.loginForm['email'].touched}
          />
         
          <div className="center">
            <div>
              <Button 
                design="raised" 
                type="submit"
                loading={ this.props.loading } 
                style ={{width: '160px', fontSize: '18px'}} 
              >
                Sign In 
              </Button> 
            </div>
          </div> 
        </form>
      </Auth>
    );
  }
}

export default Login;