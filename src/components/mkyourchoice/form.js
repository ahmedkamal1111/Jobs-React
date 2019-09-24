import React, { Component } from 'react';
import { Form, Button, Row, Col, Container, ToggleButton, ButtonGroup } from 'react-bootstrap';



export default class MyForm extends Component {

    constructor(){
        super()
        this.showDate = this.showDate.bind(this)
    }
    checkDate(event) {
        var startDate = new Date (document.getElementById("date1").value);
        var endDate = new Date(document.getElementById("date2").value);
        var diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if(diffDays > 90){
            
            alert("to2.. to2")
            event.preventDefault();
            return false;
        }
       
    }

    showDate(event){
        
        if(event.target.options[event.target.selectedIndex].text === "Pick a date"){
            document.getElementById("dateOption").style.display ="inline-block";
        
        }
        else{
            document.getElementById("dateOption").style.display = "none";
           
        }
        // if(name.options[name.selectedIndex].text == "show") {
        //    document.getElementById("dateOption").style.display ="block";
        // }
        // else{
        //     document.getElementById("dateOption").style.display = "none";
        // }
    }

    getJobDetails(e){
        if(e.target.options[e.target.selectedIndex].value == "0"){
            document.getElementById("full").style.display="block"
        }
        else{
            document.getElementById("full").style.display="none"
        }
        if(e.target.options[e.target.selectedIndex].value == "1"){
            console.log("PartTime")
        }
        if(e.target.options[e.target.selectedIndex].value == "2"){
            console.log("Project")
        }
        if(e.target.options[e.target.selectedIndex].value == "3"){
            console.log("Freelance")
        }

        // console.log("heeeeeeeeeeeeh")
    }
    
    render() {
        if (this.props.Type === "job") {
            return (


                <Container style={{ width: 300 }} >
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Job Type</Form.Label>
                                <Form.Control as="select" onChange={this.getJobDetails}>
                                    <option value="0">Full time</option>
                                    <option value="1">Part time</option>
                                    <option value="2">Project</option>
                                    <option value="3">Freelance</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row style={{display:"none"}} id="full">
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Available Positions</Form.Label>
                                <Form.Control as="select" >
                                    <option value="0" disabled>Full Time</option>
                                    <option value="1">Front-End Developer(React)</option>
                                    <option value="2">Back-End Developer(Laravel)</option>
                                    <option value="3">UI/UX Designer</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Date</Form.Label>
                                <Form.Control as="select" onChange={this.showDate}>
                                    <option>This month</option>
                                    <option>Last 2 months</option>
                                    <option>Last 3 months</option>
                                    <option id="customDate" value="show">Pick a date</option>
                                </Form.Control>
                            </Form.Group>
                         
                        </Form.Row>
                        <Form.Group controlId="formBasicEmail" style={{display:"none"}} id="dateOption">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type="date" placeholder="Pick a date" id="date1" />
                            <Form.Label>End Date</Form.Label>
                            <Form.Control type="date" placeholder="Pick a date" id="date2"/>
                        </Form.Group>
                      
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Location</Form.Label>
                                <Form.Control as="select">
                                    <option>Choose...</option>
                                    <option>...</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Button variant="primary" type="submit" onClick={this.checkDate}>
                            Search
                       </Button>
                       {/* <Form.Group>
                         <select id="getFname" onChange={this.showDate}>
                            <option value="1">Jay</option>
                            <option value="4">Sam</option>
                            <option id="admOption" value="0">Admin</option>
                        </select>


                            <div id="admDivCheck" style={{display:"none"}}>
                            admin selected
                            </div>
                        </Form.Group>   */}
                    </Form>

                </Container>
            );
        }

        return (
            <Container style={{ width: 300 }} >
                <Form>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridState" onChange={this.showDate}>
                            <Form.Label>Date</Form.Label>
                            <Form.Control as="select">
                                <option>This month</option>
                                <option>Last 2 months</option>
                                <option>Last 3 months</option>
                                <option >Pick a date</option>
                            </Form.Control>
                        </Form.Group>

                    </Form.Row>
                    <Form.Group controlId="formBasicEmail" style={{display:"none"}} id="dateOption" >
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control type="date" placeholder="Pick a date" id="date1" />
                        <Form.Label>End Date</Form.Label>
                        <Form.Control type="date" placeholder="Pick a date" id="date2" />
                    </Form.Group>
                  
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Location</Form.Label>
                            <Form.Control as="select">
                                <option>Choose...</option>
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" type="submit" onClick={this.checkDate}>
                        Search
                    </Button>
                    {/* <Button onClick={this.checkDate}>View Date Values</Button> */}
                </Form>
            </Container>
        )
    }
}