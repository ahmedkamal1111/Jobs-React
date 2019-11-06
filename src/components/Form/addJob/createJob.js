import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import {
    Heading,
    FormControl,
    FormLabel,
    Select,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button
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
                console.log(response.data.filter(i => i.id !== 5))
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
        console.log(this.state.jobTypes)
        // console.log(this.jobTypes)
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
                  

                </div>
            </div>
        );
    }

}