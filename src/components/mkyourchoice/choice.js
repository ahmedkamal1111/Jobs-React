import React, { Component } from 'react';
import { Form, Button, Row, Col, Container, ToggleButton, ButtonGroup } from 'react-bootstrap';
import Action from './action';



export default class MakeYourChoice extends Component {

    constructor() {
        super();
        this.state = {
            type: '',
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        // e.preventDefault();
        this.setState({
            type: e.target.value
        })
    }
    render() {
        console.log(this.state.type)
       
        return (
            <Container style={{ width: 300 }}>
                <div className="d-flex flex-column">
                    <ButtonGroup toggle className="mt-3">

                        <ToggleButton type="radio" name="radio" value="job" checked={this.state.type === 'job'} onChange={this.handleChange}>
                            Job
                        </ToggleButton>
                        <ToggleButton type="radio" name="radio" value="intern" checked={this.state.type === 'intern'} onChange={this.handleChange}>
                            Internship
                        </ToggleButton>
                    </ButtonGroup>

                </div>
                <Action 
                        Type={this.state.type}
                        handleChange={this.handleChange}
                />
            </Container>
           
        );
    }
}