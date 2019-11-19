import React, { Component } from "react";
import { connect } from "react-redux";

import { FaFacebook } from "react-icons/fa"; 
import { AiFillTwitterCircle, AiFillLinkedin } from 'react-icons/ai';
import "./footer.css";

class Footer extends Component {
  
  render() {

    return (
    
      <div className="footer">
        <div className="row">
          <div className="col-md-6 text-left">
            Copyright <span dangerouslySetInnerHTML={{ __html: "&copy;" }} />
            <a href="https://www.teqneia.com/" > { this.props.CompanyName } </a> 2019-{ new Date().getFullYear() === 2019 ? 2020 : new Date().getFullYear()}
            
          </div>            

          <div className="col-md-6 text-right">
            <div className="footericon">
              {this.props.facebook !== "" ? <a href={this.props.facebook} ><FaFacebook size={20} className="i" /></a> : null }
              { this.props.twitter !== "" ? <a href={this.props.twitter}><AiFillTwitterCircle size={22} className="i" /></a> : null } 
              {this.props.linkedIn !== "" ? <a href={this.props.linkedIn}><AiFillLinkedin size={22} className="i" /></a> : null }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    CompanyName: state.company.info.Name,
    url: state.company.info.homepage,
    linkedIn: state.company.info.linkedinLink,
    facebook: state.company.info.facebookLink,
    twitter: state.company.info.twitterLink,
  }
}

export default connect( mapStateToProps )( Footer );