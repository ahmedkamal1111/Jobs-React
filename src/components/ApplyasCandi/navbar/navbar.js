import React from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
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
          
          
           <Link to={`/aa/${this.props.param}`} >
              <h1 className="logo">
                { this.props.CompanyName }
              </h1>
            </Link> 
      
          
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto navitemsstyle" navbar>
              <NavItem>
                <a href="#aboutus" className="navitemcolor">
                  About Us
                </a>
              </NavItem>
              <NavItem>
                <a href="#services" className="navitemcolor">
                  Services
                </a>
              </NavItem>
              <NavItem>
                <a href="#projects" className="navitemcolor">
                  Clients&Projects
                </a>
              </NavItem>

              <NavItem>
                <a href="#newscomponent" className="navitemcolor">
                  News
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
    param: state.company.param,
    CompanyName: state.company.info.Name,
    url: state.company.info.homepage
  }
}

export default connect( mapStateToProps )( CustomNav );