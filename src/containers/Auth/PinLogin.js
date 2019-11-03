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

class PinLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginForm: {
        pin: {
          value: "",
          valid: false,
          touched: false,
          validationRules: {
            minLength: 6,
            maxLength: 6
          },
        },
        password: {
          value: "",
          valid: false,
          validationRules: {
            minLength: 6
          },
          touched: false
        },
        confirmPassword: {
          value: "",
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

  handleConfirm = () => {
    const pin = this.state.loginForm.pin.value;
    const pass = this.state.loginForm.password.value;
    this.props.onCreateNewPass(this.props.email, pin, pass);
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

    const pinValid = this.state.loginForm.pin.valid;
    const passValid = this.state.loginForm.password.valid;
    const confirmValid = this.state.loginForm.confirmPassword.valid;
      
    let text = "Create New Password";
    
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

    if ( this.props.isAuth && this.props.userId  ) {
      authRedirect = <Redirect to={`/aa/${param}/dashboard`} />
    } else if (this.props.authorize === -1) {
      authRedirect = <Redirect to={`/aa/${param}/login`} />
    }
    
    return ( 
    
      <Auth>

        { authRedirect }

        <div className="center header">      
          <h2>Reset New Password</h2>
          <p>Enter The pin that we have sent in your mail and new password.</p>
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
              placeholder="ex. 416523"
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
              placeholder="*********"
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
              placeholder="*********"
              onChange={this.inputChangeHandler}
              value={this.state.loginForm['confirmPassword'].value}
              valid={this.state.loginForm['confirmPassword'].valid}
              touched={this.state.loginForm['confirmPassword'].touched}
            />
          
            <div className="center">  
              <div>
                <Button 
                  disabled={pinValid && passValid && confirmValid ? false : true}
                  design="raised" 
                  type="submit"
                  onClick={this.handleConfirm} 
                  loading={ this.props.loading } 
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
    email: state.auth.email,
    userId: true && state.auth.userId,
    loading: state.auth.isLoading,
    isAuth: state.auth.token !== null,
    authorize: state.auth.authorize,
    isAuthorized: state.auth.authorize === 2,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateNewPass: (email, pin, pass) => dispatch(actions.createNewPass(email, pin, pass)),
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( PinLogin );