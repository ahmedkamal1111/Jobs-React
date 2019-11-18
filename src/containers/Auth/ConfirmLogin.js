import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "./../../store/actions/index";
import { Redirect } from "react-router-dom";

import PulseLoader from 'react-spinners/PulseLoader';
import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';
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

  submitHandle = ( event ) => {
    event.preventDefault();
    const pass = this.state.loginForm.password.value;
    this.props.onConfirm(this.props.email , pass);
  }

  handleForget = () => {
    this.props.onCreatePin(this.props.email);
  }

  render() {
    
    const passValid = this.state.loginForm.password.valid;  
    
    let text = "Confirm";
    
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
    
    console.log(this.props.isNew);

    if ( this.props.isAuth && this.props.userId  ) {
      authRedirect = <Redirect to={`/aa/${param}/dashboard`} />
    } else if ( this.props.isNew ) {
      authRedirect = <Redirect to={`/aa/${param}/new-password`} />
    } else if (this.props.authorize === -1) {
      authRedirect = <Redirect to={`/aa/${param}/login`} />
    }

    return ( 

      <Auth>
        
        { authRedirect }

        <div className="center header">      
          <h2>Confirm Login</h2>
        </div>

        <form className="auth-form" onSubmit={ this.submitHandle } >            
          
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
                    style ={{width: '333px', fontSize: '18px', marginTop: '16px'}} 
                  >
                    { text }
                  </Button>
                </div>
                <div className="forget">
                  <p className="forg" onClick={this.handleForget} > Forget your password? </p>
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
    isNew: state.auth.authorize === 2,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onConfirm: (email, password) => dispatch(actions.confirmLogin(email, password)),
    onCreatePin: (email) => dispatch(actions.createPin(email)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( ConfirmLogin );