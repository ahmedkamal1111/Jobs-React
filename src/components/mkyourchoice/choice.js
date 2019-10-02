import React, { Component } from 'react';

import './action.css'
import { Form, Button, Row, Col, Container, ToggleButton, ButtonGroup } from 'react-bootstrap';

export default class MakeYourChoice extends Component {

    constructor(props) {
      
        super(props);
      
        this.state = {
            search: {
                type: '',
                positionType: "-1",
                positionName: "-2",
                customDate: "-3",
                intern: "-4",
                startDate: null,
                endDate: null,
            }
        }
        
        this.handleChange = this.handleChange.bind(this)
    }


    handleChange(e) {
        let v = e.target.value;
        this.setState(prev => ({
            ...prev,
            search:{ 
                ...prev.search,
                type: v
            }
        }))
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
    }

    showDate = e => {
        let v = e.target.value;
        this.setState(prev => ({
            ...prev,
            search:{ 
                ...prev.search,
                customDate: v
            }
        }))
    }

    getJobType = e => {
        let v = e.target.value;
        this.setState(prev => ({
            ...prev,
            search:{ 
                ...prev.search,
                positionType: v
            }
        }));
    }

    getJobPosition = e => {
        let v = e.target.value;
        this.setState(prev => ({
            ...prev,
            search:{ 
                ...prev.search,
                positionName: v
            }
        }))
    }

    getIntern = e => {
        let v = e.target.value;
        this.setState(prev => ({
            ...prev,
            search:{ 
                ...prev.search,
                intern: v
            }
        }))
    }

    getStartDate = e => {
        let v = e.target.value;
        this.setState(prev => ({
            ...prev,
            search:{ 
                ...prev.search,
                startDate: v
            }
        }))
    }

    getEndDate = e => {
        let v = e.target.value;
        this.setState(prev => ({
            ...prev,
            search:{ 
                ...prev.search,
                endDate: v
            }
        }))
    }

    resetState = e => {
        let v = e.target.value;
        this.setState(prev => ({
            ...prev,
            search:{ 
                ...prev.search,
                type: v,
                positionType: "-1",
                positionName: "-2",
                customDate: "-3",
                intern: "-4",
                startDate: null,
                endDate: null,
            }
        }))
    }

    render() {
        
        let action;

        if( this.state.search.type === "job" ) {
            
            action =  (<Container  className="respo" >

            <Form onSubmit={this.checkDate} >
                <Form.Row>
                    
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Job Type</Form.Label>
                        <Form.Control as="select" onChange={this.getJobType} name="positionType">
                            <option value ="-1" disabled selected={this.state.search.positionType === "-1"}>Choose type</option>
                            <option value="0" selected={this.state.search.positionType === "0"}>Full time</option>
                            <option value="1" selected={this.state.search.positionType === "1"}>Part time</option>
                            <option value="2" selected={this.state.search.positionType === "2"}>Freelance</option>
                            <option value="3" selected={this.state.search.positionType === "3"}>Project</option>
                            
                        </Form.Control>
                    </Form.Group>
                    
                   {this.state.search.positionType === "0" && 
                   <Form.Group as={Col} controlId="formGridState"  id="full">
                        <Form.Label>Full Time -> Available Positions</Form.Label>
                        <Form.Control as="select" onChange={this.getJobPosition} name = "positionName">
                            <option value ="-2" disabled selected={this.state.search.positionName === "-2"}>Choose job</option>
                           <option value="0-a" selected={this.state.search.positionName === "0-a"}>Front-End Developer(React)</option>
                            <option value="0-b" selected={this.state.search.positionName === "0-b"}>Back-End Developer(Laravel)</option>
                            <option value="0-c" selected={this.state.search.positionName === "0-c"}>UI/UX Designer</option>
                        </Form.Control>
                    </Form.Group>}
                
                
                    {this.state.search.positionType === "1" && 
                    <Form.Group as={Col} controlId="formGridState"  id="part">
                        <Form.Label>Part Time -> Available Positions</Form.Label>
                        <Form.Control as="select" onChange={this.getJobPosition} name = "positionName" >
                            <option value ="-2"disabled selected={this.state.search.positionName === "-2"}>Choose job</option>
                            <option value="1-a" selected={this.state.search.positionName === "1-a"}>Security Engineer</option>
                            <option value="1-b" selected={this.state.search.positionName === "1-b"}>DevOps(Kubernetes)</option>
                            <option value="1-c" selected={this.state.search.positionName === "1-c"}>ML Engineer</option>
                        </Form.Control>
                    </Form.Group>}
                
                
                    {this.state.search.positionType === "2" && 
                    <Form.Group as={Col} controlId="formGridState"  id="free"> 
                        <Form.Label>Freelance->Available Positions</Form.Label>
                        <Form.Control as="select" onChange={this.getJobPosition} name = "positionName" >
                            <option value ="-2" disabled selected={this.state.search.positionName === "-2"}>Choose job</option>
                            <option value="2-a" selected={this.state.search.positionName === "2-a"}>MERN Stack Developer</option>
                            <option value="2-b" selected={this.state.search.positionName === "2-b"}>System Analyst</option>
                        </Form.Control>
                    </Form.Group>}
                
             
                    {this.state.search.positionType === "3" && 
                    <Form.Group as={Col} controlId="formGridState"  id="project">
                        <Form.Label>Project -> Available Positions</Form.Label>
                        <Form.Control as="select" onChange={this.getJobPosition} name = "positionName" >
                            <option value ="-2"disabled selected={this.state.search.positionName === "-2"}>Choose job</option>
                            <option value="3-a" selected={this.state.search.positionName === "3-a"}>XY Developer</option>
                            <option value="3-b" selected={this.state.search.positionName === "3-b"}>Add Developer</option>
                        </Form.Control>
                    </Form.Group>}
                  
                    <Form.Group as={Col} controlId="formGridState" >
                        <Form.Label>Date</Form.Label>
                        <Form.Control as="select" required onChange={this.showDate} name="Date" >
                            <option disabled selected={this.state.customDate === "-3"}> Choose date </option>
                            <option value="30" selected={this.state.search.customDate === "30"}>This month </option>
                            <option value="60" selected={this.state.search.customDate === "60"}>Last 2 months</option>
                            <option value="90" selected={this.state.search.customDate === "90"}>Last 3 months</option>
                            <option value="customDate"  selected={this.state.search.customDate ==="customDate"}>Pick a date</option>
                        </Form.Control>

                    </Form.Group>

                    {this.state.search.customDate === "customDate" && 
                    <Form.Group as={Row} onChange={this}>
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

         </Container>);

        }  else if ( this.state.search.type === "intern" ) {
            
            action = (<Container  >

            <Form onSubmit={this.checkDate} >
                <Form.Row>
                    
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Specialities</Form.Label>
                        <Form.Control as="select" name="internType" onChange={this.getInternss} >
                            <option disabled value ="-4"disabled selected={this.state.search.intern === "-4"}>Choose Speciality</option>
                            <option value="0" selected={this.state.search.intern === "0"}>React</option>
                            <option value="1" selected={this.state.search.intern === "1"}>PHP Laravel</option>
                            <option value="2" selected={this.state.search.intern === "2"}>UI/UX</option>
                            <option value="3" selected={this.state.search.intern === "3"}>Testing</option>
                            
                        </Form.Control>
                    </Form.Group>
                    
                  
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Date</Form.Label>
                        <Form.Control as="select" onChange={this.showDate.bind(this)} name="Date">
                            <option disabled selected={this.state.search.customDate === "-3"}>Choose date</option>
                            <option value="30" selected={this.state.search.customDate === "30"}>This month</option>
                            <option value="60" selected={this.state.search.customDate === "60"}>Last 2 months</option>
                            <option value="90" selected={this.state.search.customDate === "90"}>Last 3 months</option>
                            <option value="customDate" selected={this.state.search.customDate === "customDate"}>Pick a date</option>
                        </Form.Control>

                    </Form.Group>
                    {this.state.search.customDate === "customDate" && 
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
                        <Button variant="primary" type="submit">
                            Search
                        </Button>
                    </div>
            
            </Form>

         </Container>);
        }

        return (
          
            <main className="content" >
                
                <div className="toolbar"/>
                
                <Container >

                    <div className="d-flex flex-column">
                        
                        <ButtonGroup toggle className="mt-3, c-width" >

                            <ToggleButton type="radio" name="radio" value="job" checked={ this.state.type === 'job' } onChange={ this.handleChange } onChange={this.resetState.bind(this)}>
                                Job
                            </ToggleButton>
                            
                            <ToggleButton type="radio" name="radio" value="intern" checked={this.state.type === 'intern'} onChange={this.handleChange} onChange={this.resetState.bind(this)}>
                                Internship
                            </ToggleButton>

                        </ButtonGroup>

                    </div>

                    { action }
                    

                </Container>
  
             </main>
           
        );
    }
}