import React, { Component } from "react";
import "./footer.css";
import { NavLink } from "react-router-dom";

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton
} from "react-share";
import { FacebookIcon, TwitterIcon, LinkedinIcon } from "react-share";

class Footer extends Component {
  render() {
    return (
      <div className="footer ">
      <div className="row">
          <div className="col-md-6 text-center">
            {" "}
            Copyright <span dangerouslySetInnerHTML={{ __html: "&copy;" }} />
            <NavLink to="/home">Teqneia</NavLink> 2019-20
            </div>
            
              <div className="col-md-6 text-center">
              <div className="footericon">
                <FacebookShareButton url={window.location.href} className="i">
                  {" "}
                  <FacebookIcon size={32} round={true} />{" "}
                </FacebookShareButton>
                <TwitterShareButton url={window.location.href} className="i">
                  <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
                <LinkedinShareButton url={window.location.href} className="i">
                  <LinkedinIcon size={32} round={true} />
                </LinkedinShareButton>
              </div>
            </div>
            </div>
        </div>
      
    );
  }
}

export default Footer;
