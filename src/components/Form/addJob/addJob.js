import React, { Component } from "react";
import axios from "axios";
import "../form.css";

export default class AddJob extends Component {
    
   

    constructor(props) {
        super(props);
        this.state = {
            val: { type: "-1" },
            jobtype: [],
        };
    }

    handleSelect(event) {
        
        if (event.target.name === "kind") {

            this.setState({
                val: { type: event.target.options[event.target.selectedIndex].value }
            });
        }
    }
    generaterjobtype(jobtype) {
        return (
            <option value={jobtype.id}>{jobtype.name}</option>
        );
      }
    componentDidMount() {
        axios.get("https://joblaravel.tbv.cloud/interview_status").then(response => {
            console.log(response.data);
        });
            axios.get("https://joblaravel.tbv.cloud/jobtypes").then(response => {
                console.log(response.data);
                this.setState({
                    jobtype: response.data
                   })
            });
        document.getElementById("myForm").addEventListener("submit", function(e) {
          e.stopPropagation();
          e.preventDefault();
          const data= new FormData(document.getElementById("myForm"));
          axios.post("https://joblaravel.tbv.cloud/storeJob/1",data)
          .then(response => {
            console.log(response.data);
            if(response.data)
            {
             
            // this.props.history.push('/dashboard', { logged: 1 })
              
            }
            
          })
          .catch (error=>{console.log(error.message)})
      })
    }
    render() {
        const { jobtype } = this.state;
        const jobtypeoption = jobtype.map(njobtype => {
             return this.generaterjobtype(njobtype);
        });
        return (
            <div className="content-form">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-6">
                        <div className="form-group">
                            <form  id="myForm" encType="multipart/form-data" className="form-container">
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
                            {this.state.val.type === "0" && (
                                <div>
                                <select id="Job_Type" name="Job_Type" className="form-control mb-3" onChange={this.handleSelect.bind(this)}>
                                    {jobtypeoption}
                                </select>
                                <input
                                    placeholder="Name"
                                    name="Name"
                                    id="Name"
                                    className="form-control mb-3"
                                    type="text"
                                    onChange={this.handleSelect.bind(this)}
                                />
                                <input

                                    placeholder="Skills"
                                    name="Skills"
                                    id="Skills"
                                    className="form-control mb-3"
                                    type="text"
                                    onChange={this.handleSelect.bind(this)}
                                />
                                <input
                                    placeholder="Responsibilities"
                                    id="Respo"
                                    name="Respo"
                                    className="form-control mb-3"
                                    type="text"
                                    onChange={this.handleSelect.bind(this)}
                                />
                                </div>
                            )}{" "}
                            {this.state.val.type === "1" && (
                                <input
                                placeholder="Title"
                                className="form-control  mb-3"
                                type="text"
                                onChange={this.handleSelect.bind(this)}
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