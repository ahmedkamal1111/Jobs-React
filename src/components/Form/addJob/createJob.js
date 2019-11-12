import React, { Component } from 'react';
import Axios from 'axios';
import {
    Heading,
} from "@chakra-ui/core";

export default class CreateJob extends Component {
    constructor() {
        super()
        this.state = {
            jobTypes: [],
        }
    }

    componentDidMount() {
        Axios.get("https://joblaravel.tbv.cloud/jobtypes")
            .then(response => {
                const jobTypes = response.data.filter(type => type.id !== 5)
                this.setState(prevState => ({
                    ...prevState,
                    jobTypes
                }))
            })
    }
    jobTypes = () => {
        return (
            this.state.jobTypes.map((option, k) => {
                return <option value={option.id}>{option.name}</option>
            }))
    }


    render() {
        const jobTypes = this.jobTypes()
        return (
            <div className="content-form">
                <div className="container">
                    {/* <h1>hi</h1> */}
                    <Heading className="jobsHead">Add a job</Heading>
                    <select className="form-control">
                        {jobTypes}
                    </select>
                    <input type="text" placeholder="Job Title" className="form-control mt-3"></input>
                    <input type="text" placeholder="Skills" className="form-control mt-3"></input>
                    <input type="text" placeholder="Responsibilities" className="form-control mt-3"></input>
                    <input type="submit" className="btn btn-primary"></input>
                  

                </div>
            </div>
        );
    }

}