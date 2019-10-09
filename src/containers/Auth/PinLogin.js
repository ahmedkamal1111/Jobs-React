import React, { Component } from 'react';

import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';

import { required, length, equalTo } from '../../util/validators';

import Auth from './Auth';
import './Auth.css';

class PinLogin extends Component {

  constructor(props) {
    
    super(props);

    this.state = {
      companyName: "Teqneia",
      loginForm: {
        pin: {
          value: '',
          valid: false,
          touched: false,
          validators: [required, length({min: 6 , max: 6})]
        },
        password: {
          value: '',
          valid: false,
          touched: false,
          validators: [required, length({ min: 5 })]
        },
        confirmPassword: {
            value: '',
            valid: false,
            touched: false,
            validators: [ equalTo ]
        },
        formIsValid: false,    
      }
  
    };
  }

  inputChangeHandler = (input, value) => {
    
    this.setState(prevState => {
      
      let isValid = true;
      
      for (var validator of prevState.loginForm[input].validators) {
        if(validator === 'equalTo') {
            const equalValue = this.state.loginForm.password.value;
            isValid = isValid && validator(value, equalValue);
        }
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

    let authorize;

    if (this.props.authorize === 0 || this.props.authorize === 1) {
        authorize = (
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
                    Login
                  </Button>
                </div>
              </div> 
            </form>
        )
    } else if (this.props.authorize === 2){
        authorize = (
            <form className="auth-form"
                onSubmit={ e =>
                    this.props.confirmlogin(e, {
                        pin: this.state.loginForm.pin.value,
                        password: this.state.loginForm.password.value
                    })
                }
            >
                
                <Input
                id="pin"
                label="Pin Code"
                type="number"
                control="input"
                placeholder="Check your email .."
                onChange={this.inputChangeHandler}
                onBlur={this.inputBlurHandler.bind(this, 'pin')}
                value={this.state.loginForm['pin'].value}
                valid={this.state.loginForm['pin'].valid}
                touched={this.state.loginForm['pin'].touched}
                />
    
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
    
                <Input
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  control="input"
                  placeholder=" Confirm password..?"
                  onChange={this.inputChangeHandler}
                  onBlur={this.inputBlurHandler.bind(this, 'confirmPassword')}
                  value={this.state.loginForm['confirmPassword'].value}
                  valid={this.state.loginForm['confirmPassword'].valid}
                  touched={this.state.loginForm['confirmPassword'].touched}
                />
            
                <div className="center">
                
                <div>
                  <Button design="raised" type="submit" loading={ this.props.loading } style ={{width: '160px', fontSize: '18px'}} >
                    Login
                  </Button>
                </div>
                </div> 
            </form>
        );
    }

    return (
      
      <Auth>

        <div className="center header">      
          <h2>Confirm Login to { this.state.companyName } Dashboard</h2>
        </div>
        
        { authorize }
       
      </Auth>
    );

  }
}

export default PinLogin;