import React, { Component } from "react";
import "./responsbility&skils.css";
import Footer from "../footer/footer";
import Nav1 from "../navbar/navbar";
import { Button } from "reactstrap";
import Jobs from "../jobs/jobs";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Responsbility extends Component {
  render() {
    return (
      <React.Fragment>
        <Nav1 />
        <div className=" jumbotron3 ">
          <br />
          <h3>
            <Link className="jobslink" to={"/jobs"}>
              Jobs
            </Link>
            > {Jobs.Title}
          </h3>
          <br />
          <br />
          <br />
        </div>
        <div className="container detailsdivstyle">
          <div className="row">
            <div className="col-md-12">
              <h2>Responsbility</h2>
              <ul>
                <li>conduct a full cycle for testing a software</li>
              </ul>
              <h2>Skills</h2>
              <ul>
                <li>
                  Background in computer science/programmingPrior experience in
                  software testing
                </li>
                <li>High level of attention to detail</li>
                <li>Organized</li>
                <li>
                  Create and document automated and manual test plans and
                  procedures, execute tests, analyze results and report on test
                  problems and anomalies (document bugs)
                </li>
                <li>
                  Perform software testing in all phases of the
                  design-develop-test-release-maintain software life cycle
                </li>
                <li>
                  Understand various development methodologies, such as Agile
                  and Scrum, and platforms or environments Possess thorough
                  knowledge of several testing tools
                </li>
                <li>
                  Be fluent in UNIX, Linux and/or Windows, as well as scripting
                  and command-line tools
                </li>
                <li>Be a multi-tasker</li>
                <li>
                  Be an excellent communicator (written and verbal) with
                  development, operations, product manag
                </li>
              </ul>

              <div className="row">
                <div className="col-md-10" />
                <div className="col-md-2">
                  {" "}
                  <a href="/job_form">
                    {" "}
                    <button
                      className="btn btn-primary buttonstyleres"
                      type="submit"
                    >
                      <h6> Apply Now</h6>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*<Footer />*/}
        <br />
        <Footer />
      </React.Fragment>
    );
  }
}

export default Responsbility;
