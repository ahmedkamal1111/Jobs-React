import React, { Component } from 'react';

import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';

import { required, length } from '../../util/validators';

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
          validators: [required, length({ min: 5 })]
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
            onBlur={this.inputBlurHandler.bind(this, 'password')}
            value={this.state.loginForm['password'].value}
            valid={this.state.loginForm['password'].valid}
            touched={this.state.loginForm['password'].touched}
            />

            <div className="center">
                
                <div className="forget">
                    <Button design="flat" type="submit" loading={ this.props.loading } >
                    Forget your password?
                    </Button>
                </div>
                
                <div>
                    <Button design="raised" type="submit" loading={ this.props.loading } style ={{width: '160px', fontSize: '18px'}} >
                      Confirm
                    </Button>
                </div>
            </div> 
        </form>
      </Auth>
    );

  }
}

export default ConfirmLogin;