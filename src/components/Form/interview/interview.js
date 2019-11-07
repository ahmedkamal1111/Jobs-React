import React, { Component } from "react";
import "../from.css";

export default class Interview extends Component {
  state = {
    val: { type: "-1" }
  };
  handleSelect(event) {
    if (event.target.name === "kind") {
      this.setState({
        val: { type: event.target.options[event.target.selectedIndex].value }
      });
    }
  }
  render() {
    return (
      <div className="content-form">
        <div className="container">
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
              <div className="form-group">
                <form className="form-container">
                  <select
                    className="form-control mb-3"
                    name="kind"
                    onChange={this.handleSelect.bind(this)}
                  >
                    <option
                      value="-1"
                      selected={this.state.val.type === "-1"}
                    ></option>
                    <option value="0" selected={this.state.val.type === "0"}>
                      Job
                    </option>
                    <option value="1" selected={this.state.val.type === "1"}>
                      Internship
                    </option>
                  </select>{" "}
                  {this.state.val.type === 0 && (
                    <select className="form-control mb-3">
                      <option value="-1"></option>
                      <option value="0">Front End</option>
                      <option value="1">Back End</option>
                    </select>
                  )}{" "}
                  {this.state.val.type === 1 && (
                    <select className="form-control mb-3">
                      <option value="-1"></option>
                      <option value="0"> Front End </option>
                      <option value="1"> Back End </option>
                    </select>
                  )}
                  <input className="form-control mb-3" type="date" />
                  <input className="form-control mb-3" type="time" />
                  <button
                    type="submit"
                    className="btn btn-info cutom-btn  btn-md float-right"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <div className="col-sm-3"></div>
          </div>
        </div>
      </div>
    );
  }
}