import React, { Component, Fragment } from 'react';
import { Form, Button, Row, Col, Container, ToggleButton, ButtonGroup } from 'react-bootstrap';
import './action.css';


export default class MyForm extends Component {

    constructor(){
        super()
        this.state = {
            positionType: "-1",
            positionName: "-2",
            customDate: "-3",
            intern: "-4",
            startDate: null,
            endDate: null,
        }
       
    }
    checkDate(event) {

        var startDate = new Date (document.getElementById("dateStart").value);
        var endDate = new Date(document.getElementById("dateEnd").value);
      
        var diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if(diffDays > 90){
            
            alert("mantash")
            event.preventDefault();
        
        }

        // this.setState({
        //     positionType: "-1",
        //     recent: "-3",
        //     positionName: "-2",
        //     customDate: ""
        // })
       
    }

    showDate(event){
        if(event.target.name === "Date")
        {   
     
            
            // if(event.target.options[event.target.selectedIndex].text !== "pick a date") {
            //     this.state.recent = event.target.options[event.target.selectedIndex].value
            // }
            // else {
            //     this.state.customDate = event.target.options[event.target.selectedIndex].value
            // }
            this.setState({
                customDate: event.target.options[event.target.selectedIndex].value
            })

            
                
        }
            
    }

    getJobDetails(e){
        if(e.target.name === "positionType") {
            // this.state.positionType = e.target.options[e.target.selectedIndex].value
            this.setState({
                positionType: e.target.options[e.target.selectedIndex].value
            })   
        }
       
    }

    getJobPosition(e) {
        if(e.target.name === "positionName")
        {
            // this.state.positionName = e.target.options[e.target.selectedIndex].value
            this.setState({
                 positionName: e.target.options[e.target.selectedIndex].value 
            })
        }
        
    }

    getIntern(e) {
        this.setState({
            intern: e.target.options[e.target.selectedIndex].value
        })
    }

    getStartDate(e) {
        this.setState({
            startDate: e.target.value
        })
    }

    getEndDate(e) {
        this.setState({
            endDate: e.target.value
        })
    }

    resetState(){
        this.setState({
            positionType: "-1",
            positionName: "-2",
            customDate: "-3",
            intern: "-4",
            startDate: null,
            endDate: null,
        })
    }
    
    
    render() {
       
        if (this.props.Type === "job") {
            console.log(this.state.positionType)
     
            console.log(this.state.positionName)
            console.log(this.state.customDate)
            console.log(this.state.startDate)
            console.log(this.state.endDate)
            
            return (


                <Container  className="respo" >
             

                    <Form onSubmit={this.checkDate} onChange={this.resetState.bind(this)}>
                        <Form.Row>
                            
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Job Type</Form.Label>
                                <Form.Control as="select" onChange={this.getJobDetails.bind(this)} name="positionType">
                                    <option value ="-1"disabled selected={this.state.positionType === "-1"}>Choose type</option>
                                    <option value="0" selected={this.state.positionType === "0"}>Full time</option>
                                    <option value="1" selected={this.state.positionType === "1"}>Part time</option>
                                    <option value="2" selected={this.state.positionType === "2"}>Freelance</option>
                                    <option value="3" selected={this.state.positionType === "3"}>Project</option>
                                    
                                </Form.Control>
                            </Form.Group>
                            
                           {this.state.positionType == "0" && 
                           <Form.Group as={Col} controlId="formGridState"  id="full">
                                <Form.Label>Full Time->Available Positions</Form.Label>
                                <Form.Control as="select" onChange={this.getJobPosition.bind(this)} name = "positionName">
                                    <option value ="-2"disabled selected={this.state.positionName === "-2"}>Choose job</option>
                                   <option value="0-a" selected={this.state.positionName === "0-a"}>Front-End Developer(React)</option>
                                    <option value="0-b" selected={this.state.positionName === "0-b"}>Back-End Developer(Laravel)</option>
                                    <option value="0-c" selected={this.state.positionName === "0-c"}>UI/UX Designer</option>
                                </Form.Control>
                            </Form.Group>}
                        
                        
                            {this.state.positionType == "1" && 
                            <Form.Group as={Col} controlId="formGridState"  id="part">
                                <Form.Label>Part Time->Available Positions</Form.Label>
                                <Form.Control as="select" onChange={this.getJobPosition.bind(this)} name = "positionName" >
                                    <option value ="-2"disabled selected={this.state.positionName === "-2"}>Choose job</option>
                                    <option value="1-a" selected={this.state.positionName === "1-a"}>Security Engineer</option>
                                    <option value="1-b" selected={this.state.positionName === "1-b"}>DevOps(Kubernetes)</option>
                                    <option value="1-c" selected={this.state.positionName === "1-c"}>ML Engineer</option>
                                </Form.Control>
                            </Form.Group>}
                        
                        
                            {this.state.positionType == "2" && 
                            <Form.Group as={Col} controlId="formGridState"  id="free"> 
                                <Form.Label>Freelance->Available Positions</Form.Label>
                                <Form.Control as="select" onChange={this.getJobPosition.bind(this)} name = "positionName" >
                                    <option value ="-2"disabled selected={this.state.positionName === "-2"}>Choose job</option>
                                    <option value="2-a" selected={this.state.positionName === "2-a"}>MERN Stack Developer</option>
                                    <option value="2-b" selected={this.state.positionName === "2-b"}>System Analyst</option>
                                    
                                </Form.Control>
                            </Form.Group>}
                        
                     
                            {this.state.positionType == "3" && 
                            <Form.Group as={Col} controlId="formGridState"  id="project">
                                <Form.Label>Project->Available Positions</Form.Label>
                                <Form.Control as="select" onChange={this.getJobPosition.bind(this)} name = "positionName" >
                                    <option value ="-2"disabled selected={this.state.positionName === "-2"}>Choose job</option>
                                    <option value="3-a" selected={this.state.positionName === "3-a"}>XY Developer</option>
                                    <option value="3-b" selected={this.state.positionName === "3-b"}>Add Developer</option>
                                </Form.Control>
                            </Form.Group>}
                          
                            <Form.Group as={Col} controlId="formGridState" >
                                <Form.Label>Date</Form.Label>
                                <Form.Control as="select" required onChange={this.showDate.bind(this)} name="Date" >
                                    <option disabled selected={this.state.customDate === "-3"}>Choose date</option>
                                    <option value="30" selected={this.state.customDate === "30"}>This month</option>
                                    <option value="60" selected={this.state.customDate === "60"}>Last 2 months</option>
                                    <option value="90" selected={this.state.customDate === "90"}>Last 3 months</option>
                                    <option value="customDate"  selected={this.state.customDate ==="customDate"}>Pick a date</option>
                                </Form.Control>
      
                            </Form.Group>

                            {this.state.customDate === "customDate" && 
                            <Form.Group as={Row} onChange={this.checkDate.bind(this)}>
                                <Form.Group as={Col}  controlId="formGridState"  >
                                    <Form.Label >Start Date</Form.Label>
                                    <Form.Control type="date"  id="dateStart" required onChange={this.getStartDate.bind(this)}/>
                                </Form.Group>
                                <Form.Group as={Col}  controlId="formGridState"  >
                                    <Form.Label >End Date</Form.Label>
                                    <Form.Control type="date"   id="dateEnd" required onChange={this.getEndDate.bind(this)}/>
                                </Form.Group>
                            </Form.Group>}
                            
                         
                        
                        
                       
                            </Form.Row>
                            <div className="text-center pt-3" >
                                <Button variant="primary" type="submit"   >
                                     Search
                                </Button>
                            </div>
                        
                    
                    </Form>

                 </Container>
                
            );
        }
        if(this.props.Type == "intern") {
         
     
            console.log(this.state.intern)
            console.log(this.state.customDate)
            console.log(this.state.startDate)
            console.log(this.state.endDate)
          
            return (
                <Container style={{ width: 1200 }} >
             

                    <Form onSubmit={this.checkDate} onChange={this.resetState.bind(this)}>
                        <Form.Row>
                            
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Specialities</Form.Label>
                                <Form.Control as="select" name="internType" onChange={this.getIntern.bind(this)} >
                                    <option disabled value ="-4"disabled selected={this.state.intern === "-4"}>Choose Speciality</option>
                                    <option value="0" selected={this.state.intern === "0"}>React</option>
                                    <option value="1" selected={this.state.intern === "1"}>PHP Laravel</option>
                                    <option value="2" selected={this.state.intern === "2"}>UI/UX</option>
                                    <option value="3" selected={this.state.intern === "3"}>Testing</option>
                                    
                                </Form.Control>
                            </Form.Group>
                            
                          
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Date</Form.Label>
                                <Form.Control as="select" onChange={this.showDate.bind(this)} name="Date">
                                    <option disabled selected={this.state.customDate === "-3"}>Choose date</option>
                                    <option value="30" selected={this.state.customDate === "30"}>This month</option>
                                    <option value="60" selected={this.state.customDate === "60"}>Last 2 months</option>
                                    <option value="90" selected={this.state.customDate === "90"}>Last 3 months</option>
                                    <option value="customDate" selected={this.state.customDate ==="customDate"}>Pick a date</option>
                                </Form.Control>
      
                            </Form.Group>
                            {this.state.customDate == "customDate" && 
                            <Form.Group as={Row} onChange={this.checkDate.bind(this)}>
                                <Form.Group as={Col}  controlId="formGridState"  >
                                    <Form.Label >Start Date</Form.Label>
                                    <Form.Control type="date" id="dateStart" onChange={this.getStartDate.bind(this)} />
                                </Form.Group>
                                <Form.Group as={Col}  controlId="formGridState"  >
                                    <Form.Label >End Date</Form.Label>
                                    <Form.Control type="date" id="dateEnd" onChange={this.getEndDate.bind(this)} />
                                </Form.Group>
                              </Form.Group>
                            }
                          
                       
                            </Form.Row>
                            <div className="text-center pt-3" >
                                <Button variant="primary" type="submit"   >
                                     Search
                                </Button>
                            </div>
                        
                    
                    </Form>

                 </Container>
            )
        }


        
    }
}