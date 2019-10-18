import React from "react";
import logo1 from '../../../edge.png';
import "./navbar.css";

import { NavLink, Linkto } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";

export default class Nav1 extends React.Component {
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
  componentDidMount() {
    window.onscroll = function() {
      scrollFunction();
    };

    function scrollFunction() {
      if (
        document.body.scrollTop > 200 ||
        document.documentElement.scrollTop > 200
      ) {
        document.getElementById("navbar").style.backgroundColor = "#18264f";
      } else {
        document.getElementById("navbar").style.backgroundColor =
          "rgba(0,0,0,0)";
      }
    }
  }

  render() {
    return (
      <div>
        <Navbar id="navbar" color="" light expand="md" className="navstyle">
          <NavbarBrand to="/home">
            <img src={logo1} className="imgStyle3 " />
          </NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto navitemsstyle" navbar>
              <NavItem>
                <NavLink to="/home" className="navitemcolor">
                  Home
                </NavLink>
              </NavItem>
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
                <a href="#corevalues" className="navitemcolor">
                  Core Values
                </a>
              </NavItem>
              <NavItem>
                <a href="#joinus" className="navitemcolor">
                  Join Us
                </a>
              </NavItem>
              <NavItem>
                <NavLink to="/contactus" className="navitemcolor">
                  Contact
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/components/" className="navitemcolor">
                  Support
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
