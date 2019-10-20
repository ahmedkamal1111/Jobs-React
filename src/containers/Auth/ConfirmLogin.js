import React, { Component } from 'react';

import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';
import { withRouter } from 'react-router-dom';
import validate from '../../util/validation';

import Auth from './Auth';
import './Auth.css';

class ConfirmLogin extends Component {

  constructor(props) {
    
    super(props);

    this.state = {
      loginForm: {
        password: {
          value: "",
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

    const passValid = this.state.loginForm.password.valid;  
    
    return ( 

      <Auth>
        <div className="center header">      
          <h2>Confirm Login</h2>
        </div>

        <form className="auth-form"
          onSubmit={ e => {
            this.props.confirmlogin(e, { password: this.state.loginForm.password.value })
            this.props.history.push("/dashboard")
          }}
        >            
          <Input
            id="password"
            label="Password"
            type="password"
            control="input"
            placeholder="*******"
            onChange={this.inputChangeHandler}
            value={this.state.loginForm['password'].value}
            valid={this.state.loginForm['password'].valid}
            touched={this.state.loginForm['password'].touched}
          />

            <div className="center">
                
                <div>
                  <Button
                    disabled={passValid ? false : true} 
                    design="raised" 
                    type="submit" 
                    loading={ this.props.loading } 
                    style ={{width: '333px', fontSize: '18px', marginTop: '16px'}} 
                  >
                    Confirm
                  </Button>
                </div>
            </div> 
            <div className="forget">
              <p className="forg" onClick={this.props.createPin}> Forget your password? </p>
            </div>
        </form>
      </Auth>
    );
  }
}

export default withRouter(ConfirmLogin);