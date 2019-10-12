import React, { Component } from 'react';

import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';

import validate from '../../util/validation';

import Auth from './Auth';
import './Auth.css';

class ConfirmLogin extends Component {

  constructor(props) {
    
    super(props);

    this.state = {
      companyName: "Teqneia",
      loginForm: {
        password: {
          value: '',
          valid: false,
          touched: false,
          validationRules: {
            minLength: 6
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
          <h2>Confirm Login to { this.state.companyName } Dashboard</h2>
        </div>

        <form className="auth-form"
          onSubmit={ e =>
          this.props.confirmlogin(e, {
            password: this.state.loginForm.password.value
          })
          }
        >            
          <Input
            id="password"
            label="Password"
            type="password"
            control="input"
            placeholder="password..?"
            onChange={this.inputChangeHandler}
            value={this.state.loginForm['password'].value}
            valid={this.state.loginForm['password'].valid}
            touched={this.state.loginForm['password'].touched}
          />

            <div className="center">
                
                <div>
                  <Button design="raised" type="submit" loading={ this.props.loading } style ={{width: '160px', fontSize: '18px'}} >
                    Confirm
                  </Button>
                </div>
            </div> 
        </form>
        <div className="forget">
          <Button design="flat" onClick={this.props.createPin} loading={ this.props.loading } >
            Forget your password?
          </Button>
        </div>
      </Auth>
    );

  }
}

export default ConfirmLogin;