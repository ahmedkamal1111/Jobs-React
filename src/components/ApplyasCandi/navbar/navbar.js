import React from "react";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  Nav,
  NavItem
} from "reactstrap";

import "./navbar.css";

class CustomNav extends React.Component {
  
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {

    return (
    
      <div>
        <Navbar id="navbar" expand="md" className="navstyle">
               
          <h1 className="logo">
            <a href={this.props.url} className="linkLogo">
              <h2 className="subLogo">
                LOGO
              </h2>
            </a>
            <h5 className="navbar-brand">
              { this.props.CompanyName }
            </h5>  
          </h1> 
          
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto navitemsstyle" navbar>
              <NavItem>
                <a href={this.props.url} className="navitemcolor">
                  About Us
                </a>
              </NavItem>
              <NavItem>
                <a href="#services" className="navitemcolor">
                  Services
                </a>
              </NavItem>
            
              <NavItem>
                <NavLink to={`/aa/${this.props.param}/contact-us`} className="navitemcolor">
                  Contact
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    CompanyName: state.company.info.Name,
    url: state.company.info.homepage
  };
};

export default connect( mapStateToProps )( CustomNav );