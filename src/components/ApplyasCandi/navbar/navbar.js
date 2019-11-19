import React from "react";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  Nav,
  NavItem
} from "reactstrap";
import { AiTwotoneHome } from 'react-icons/ai';

import "./navbar.css";

class CustomNav extends React.Component {
  
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { isOpen: false };
  }

  toggle() { this.setState({ isOpen: !this.state.isOpen }); }

  render() {

    return (
    
      <div>
        
        <h1 className="logoJobs">
          <a href={this.props.url} className="linkLogo">
            <img src={`https://joblaravel.tbv.cloud/tt/cvs/${this.props.logo}`} alt={`${this.props.CompanyName} Logo`} class="subLogo" />
          </a>
        </h1>

        <Navbar id="navbar" expand="md" className="navstyle">
          <Nav className="ml-auto navitemsstyle" navbar>
            <NavItem>
              <a href={this.props.url} className="navitemcolor">
                <AiTwotoneHome size={30} color="black" className="i" />
              </a>
            </NavItem>
          </Nav>

        </Navbar>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    CompanyName: state.company.info.Name,
    url: state.company.info.homepage,
    logo: state.company.info.logo,
  };
};

export default connect( mapStateToProps )( CustomNav );