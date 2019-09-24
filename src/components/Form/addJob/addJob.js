import React, { Component } from "react";
import "../from.css";

export default class AddJob extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            val: { type: "-1" }
        };
    }

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
                                selected={this.state.val.type  === "-1"}
                                ></option>
                                <option value="0" selected={this.state.val.type === "0"}>
                                Job
                                </option>
                                <option value="1" selected={this.state.val.type === "1"}>
                                Internship
                                </option>
                            </select>{" "}
                            {this.state.val.type === 0 && (
                                <div>
                                <select className="form-control mb-3">
                                    <option value="-1"></option>
                                    <option value="0">Full time</option>
                                    <option value="1">Part Time</option>
                                    <option value="1">Project</option>
                                    <option value="1">Freelance</option>
                                </select>
                                <input
                                    placeholder="Title"
                                    className="form-control mb-3"
                                    type="text"
                                />
                                <input
                                    placeholder="Skills"
                                    className="form-control mb-3"
                                    type="text"
                                />
                                <input
                                    placeholder="Responsibilities"
                                    className="form-control mb-3"
                                    type="text"
                                />
                                </div>
                            )}{" "}
                            {this.state.val.type === 1 && (
                                <input
                                placeholder="Title"
                                className="form-control  mb-3"
                                type="text"
                                />
                            )}
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