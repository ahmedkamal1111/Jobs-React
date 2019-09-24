import React, { Component } from 'react';
import MyForm from './form'

export default class Action extends Component {
    render() {
        // console.log(this.props.Type)
        if(this.props.Type === "job") {
            return (
                <MyForm Type={this.props.Type}/>
            );  
        }
        else if(this.props.Type === "intern") {
            return (
                <MyForm Type={this.props.Type}/>
            );
        }
        return (
            <h1>nothing</h1>
        )  
    }
}