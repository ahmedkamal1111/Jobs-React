import React, { Component } from 'react';
import Axios from 'axios';

export default class CreateJob extends Component {
    componentDidMount(){
        Axios.get("https://joblaravel.tbv.cloud/jobtypes")
        .then(response => {
            console.log(response.data.filter(i => i.id !== 5))
        })
    }

    render(){
        return (<h1>tmam</h1>)
    }
    
}