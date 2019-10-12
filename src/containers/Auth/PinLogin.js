import React, { Component } from 'react';
import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';
import validate from '../../util/validation';
import Auth from './Auth';
import './Auth.css';

class PinLogin extends Component {

  constructor(props) {
    
    super(props);

    this.state = {
      companyName: "Teqneia",
      loginForm: {
        pin: {
          value: "",
          valid: false,
          touched: false,
          validationRules: {
            menLength: 6,
            maxLength: 6
          },
        },
        password: {
          value: "",
          valid: false,
          validationRules: {
            menLength: 6
          },
          touched: false
        },
        confirmPassword: {
          value: '',
          valid: false,
          touched: false,
          validationRules: {
            equalTo: 'password'
          },
        },
        formIsValid: false,    
      }
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this); 
  }
  
  inputChangeHandler = (key, value) => {
    let connectedValue = {};
    if ( this.state.loginForm[key].validationRules.equalTo ) {
      const equalControl = this.state.loginForm[key].validationRules.equalTo;
      const equalValue = this.state.loginForm[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
    this.setState(prevState => {
      return {
        ...prevState,
        loginForm: {
          ...prevState.loginForm,
          confirmPassword: {
            ...prevState.loginForm.confirmPassword,
            valid:
              key === "password"
                ? validate(
                  prevState.loginForm.confirmPassword.value,
                  prevState.loginForm.confirmPassword.validationRules,
                  connectedValue
                )
                : prevState.loginForm.confirmPassword.valid
              },
              [key]: {
                ...prevState.loginForm[key],
                value: value,
                valid: validate(
                  value,
                  prevState.loginForm[key].validationRules,
                  connectedValue
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
              this.props.createAcc(e, {
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
              onChange={ this.inputChangeHandler}
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
              onChange={ this.inputChangeHandler}
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
              value={this.state.loginForm['confirmPassword'].value}
              valid={this.state.loginForm['confirmPassword'].valid}
              touched={this.state.loginForm['confirmPassword'].touched}
            />
          
            <div className="center">  
              <div>
                <Button 
                  design="raised" 
                  type="submit" 
                  loading={ this.props.loading } 
                  style ={{width: '160px', fontSize: '18px'}} 
                >
                  Confirm
                </Button>
              </div>
          </div>
        </form>
      </Auth>
    );

  }
}

export default PinLogin;