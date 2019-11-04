import React, { Component } from "react";
import { connect } from "react-redux";

import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, LinkedinIcon } from "react-share";

import "./footer.css";

class Footer extends Component {
  
  render() {

    return (
    
    <div className="footer ">
      <div className="row">
          <div className="col-md-6 text-center">
            Copyright <span dangerouslySetInnerHTML={{ __html: "&copy;" }} />
            <a href={`${this.props.url}`} > { this.props.CompanyName } </a> 2019-20
            
            </div>            

              <div className="col-md-6 text-center">
                <div className="footericon">
                  <FacebookShareButton url="https://www.facebook.com/TEQNEIA" className="i">
                    <FacebookIcon size={25} round={true} />{" "}
                  </FacebookShareButton>
                  <TwitterShareButton url="https://twitter.com/Teqneia_ICT" className="i">
                    <TwitterIcon size={25} round={true} />
                  </TwitterShareButton>
                  <LinkedinShareButton url="https://www.linkedin.com/company/teqneia" className="i">
                    <LinkedinIcon size={25} round={true} />
                  </LinkedinShareButton>
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