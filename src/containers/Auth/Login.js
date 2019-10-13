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

    const mailValid =this.state.loginForm.email.valid;
    
    return (
      
      <Auth>

        <div className="center header">      
          <h2> Log Into My Account </h2>
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
                loading={ this.props.loading } 
                style ={{width: '333px', fontSize: '18px', marginTop: '16px'}} 
              >
                Log In
              </Button> 
            </div>
          </div> 
        </form>
      </Auth>
    );
  }
}

export default Login;