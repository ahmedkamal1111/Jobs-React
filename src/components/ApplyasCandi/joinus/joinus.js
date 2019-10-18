import React, { Component } from "react";
import "./joinus.css";
import ballon from "../../../dec.jpeg";
import surface from "../../../dec.jpeg";
// import MediaQuery from "react-responsive";
// import ScrollAnimation from "react-animate-on-scroll";
import { Tabs, Tab } from "react-bootstrap";

import "react-tabs/style/react-tabs.css";

import Training from "../training/training";
import Res from "../responsbility&skils/responsbility&skils";
import Jobs from "../jobs/jobs";


class Joinus extends Component {
  render() {
    return (
      <React.Fragment>
        <div className=" jumbotron3 ">
          <br />
          <h3> JOBS </h3>
          <br />
          <br />
          <br />
        </div>

        <Tabs
          defaultActiveKey="JOBS"
          className="nav-justified"
          id="uncontrolled-tab-example"
        >
          <Tab eventKey="JOBS" title="JOBS">
            
            <Jobs /> 
          </Tab>
          <Tab eventKey="Hands on training " title="Hands on training ">
            <Training />
          </Tab>
        </Tabs>
      </React.Fragment>
    );
  }
}

export default Joinus;
