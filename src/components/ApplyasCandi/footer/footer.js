import React, { Component } from "react";
import "./footer.css";
import { NavLink } from "react-router-dom";

import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, LinkedinIcon } from "react-share";

class Footer extends Component {
  
  render() {

    return (
    
    <div className="footer ">
      <div className="row">
          <div className="col-md-6 text-center">
            Copyright <span dangerouslySetInnerHTML={{ __html: "&copy;" }} />
            <NavLink to="/">Teqneia</NavLink> 2019-20
            
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

export default Footer;