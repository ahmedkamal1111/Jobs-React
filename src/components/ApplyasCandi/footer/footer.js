import React, { Component } from "react";
import { connect } from "react-redux";

import { FaFacebook } from "react-icons/fa"; 
import { AiFillTwitterCircle, AiFillLinkedin } from 'react-icons/ai';
import "./footer.css";

class Footer extends Component {
  
  render() {

    return (
    
    <div className="footer ">
      <div className="row">
          <div className="col-md-6 text-left">
            Copyright <span dangerouslySetInnerHTML={{ __html: "&copy;" }} />
            <a href="https://www.teqneia.com/" > { this.props.CompanyName } </a> 2019-20
            
            </div>            

              <div className="col-md-6 text-right">
                <div className="footericon">
                  <FaFacebook size={20} className="i" />
                  <AiFillTwitterCircle size={22} className="i" />
                  <AiFillLinkedin size={22} className="i" />
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
    url: state.company.info.homepage
  }
}

export default connect( mapStateToProps )( Footer );