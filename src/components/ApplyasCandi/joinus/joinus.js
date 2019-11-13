import React, { Component } from "react";
import { connect } from 'react-redux';

import HashLoader from 'react-spinners/HashLoader';
import { Tabs, Tab } from "react-bootstrap";

import * as actions from '../../../store/actions/index';
import Cover from "../Cover/Cover";
import Jobs from "../jobs/jobs";
import Navbar from '../navbar/navbar';
import Training from "../training/training";

import "./joinus.css";
import "react-tabs/style/react-tabs.css";

class Joinus extends Component {

  componentDidMount() {
    const param = this.props.match.params.anything;   
    this.props.onFetchCompanyInfo(param);
  }

  render() {

    let comp = (
      <div className="sweetLoading">
        <HashLoader
          sizeUnit={"px"}
          size={50}
          color={'#0C407C'}
          margin="2px"
          loading={this.props.loading}
        />
      </div> 
    );

    if(!this.props.loading) {
      return (
        <React.Fragment>
          
          <Navbar />
          
          <Cover />

          <Tabs
            defaultActiveKey="JOBS"
            className="nav-justified tabs"
            id="uncontrolled-tab-example"
          >
          
            <Tab eventKey="JOBS" title="JOBS">
              {/* <Jobs />  */}
            </Tab>
            
            <Tab eventKey="Hands on training" title="Training">
              <Training />
            </Tab>
          
          </Tabs>
        </React.Fragment>
      );
    }
    return comp;
  }
}


const mapStateToProps = state => {
  return {
    loading: state.company.isLoading  
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchCompanyInfo: (param) => dispatch(actions.fetchCompanyInfo(param)),
  };  
};

export default connect(mapStateToProps, mapDispatchToProps)( Joinus );