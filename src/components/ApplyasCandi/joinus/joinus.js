import React, { Component } from "react";
import "./joinus.css";
import { Tabs, Tab } from "react-bootstrap";
import "react-tabs/style/react-tabs.css";
import Cover from "../Cover/Cover";
import Training from "../training/training";
import Jobs from "../jobs/jobs";
import Navbar from '../navbar/navbar';


class Joinus extends Component {

  render() {
    return (

      <React.Fragment>
        
        <Navbar />

        <div className="cover" >
          <Cover />
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