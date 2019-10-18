import React, { Component } from "react";
import "./jobs.css";
import { Button } from "reactstrap";
import Footer from "../footer/footer";
import axios from 'axios';

class Jobs extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container jobscontainerstyle">
          <h2 className="jobtitlestyle text-center">BE PART OF OUR TEAM</h2>
          <hr className="hrstyle" />
          <h4 className="text-center  jobtitlestyle2">
            Apply for our available jobs now
          </h4>
          <div className="row">
            <div className="col-md-1" />
            <div className="col-md-3 jobcardstyle">
              <h3>Flutter Developer</h3>
              <h3>Full Time</h3>
              <a href="/details">
                {" "}
                <Button
                  className="btn btn-default jobsbuttonstyle1 "
                  type="submit"
                >
                  Details
                </Button>
              </a>
            </div>

            <div className="col-md-3 jobcardstyle">
              <h3>React native Developer</h3>
              <h3>Full Time</h3>
              <a href="/details">
                {" "}
                <Button
                  className="btn btn-default jobsbuttonstyle1 "
                  type="submit"
                >
                  Details
                </Button>
              </a>
            </div>

            <div className="col-md-3 jobcardstyle">
              <h3>software Tester</h3>
              <h3>Full Time</h3>
              <a href="/details">
                {" "}
                <Button
                  className="btn btn-default jobsbuttonstyle1 "
                  type="submit"
                >
                  Details
                </Button>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-md-1" />
            <div className="col-md-3 jobcardstyle">
              <h3>React js</h3>
              <h3>Freelance</h3>
              <a href="/details">
                {" "}
                <Button
                  className="btn btn-default jobsbuttonstyle1 "
                  type="submit"
                >
                  Details
                </Button>
              </a>
            </div>

            <div className="col-md-3 jobcardstyle">
              <h3>Other jobs</h3>
              <h3>Full Time</h3>
              <a href="/details">
                {" "}
                <Button
                  className="btn btn-default jobsbuttonstyle1 "
                  type="submit"
                >
                  Details
                </Button>
              </a>
            </div>

            {/*we have to but this class name in the bellow div when entering data in it jobcardstyle*/}
            <div className="col-md-3 " />
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Jobs;
