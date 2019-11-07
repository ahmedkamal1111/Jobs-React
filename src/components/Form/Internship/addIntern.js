import React, { Component } from 'react';
import Axios from 'axios';
import '../form.css';
import {
    Heading,
} from "@chakra-ui/core";

export default class CreateInternship extends Component {
    constructor() {
        super()
        this.state = {
            internship: [],
        }
    }
    componentDidMount() {
        Axios.get("https://joblaravel.tbv.cloud/jobtypes")
            .then(response => {
                const internship = response.data.filter(i => i.id === 5)
                this.setState(prevState => ({
                    ...prevState,
                    internship
                }))

            })
    }

    internData = () => {
        return (
            this.state.internship.map((option, k) => {
                return <option value={option.id}></option>
            }))
    }
    render() {

        return (
            <div className="content-form">
                <div className="container">
                    <Heading className="jobsHead">Add an internship</Heading>
                    <select className="form-control" disabled>
                        {this.state.internship.map((item, k) => {
                            return <option selected value={item.id}>{item.name}</option>
                        })}
                    </select>
                    <input type="text" placeholder="Speciality" className="form-control mt-3"></input>
                </div>
            </div>

        );
    }
}