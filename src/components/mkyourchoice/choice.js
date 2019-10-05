import React, { Component } from 'react';
import { Form, Button, Row, Col, Container, ToggleButton, ButtonGroup } from 'react-bootstrap';
import './action.css'

export default class MakeYourChoice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            search: {
                type: '',
                positionType: "-1",
                positionName: "-2",
                customDate: "-3",
                intern: "-4",
                startDate: "",
                endDate: "",
            }
        }
    }

    //Handle all selections 
    handleSelectionChange = (input, e) => {
        let v = e.target.value;
        this.setState(prevState => ({
            ...prevState,
            search:{ 
                ...prevState.search,
                [input]: v
            }
        }))
    }

    //check the date period
    checkDate = e => {
        const start = this.state.search.startDate;
        const end = this.state.search.endDate;
        let diffTime = Math.abs( end.getTime() - start.getTime() );
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if(diffDays > 90) {
            e.preventDefault();
        }
    }

    //toggle between intern and job
    choiceHanlde = e => {
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

    //render submit button
    renderSubmitButton = () => {
        return (
            <div className="text-center pt-3" >
                <Button variant="primary" type="submit"> Search </Button>
            </div>
        );
    }

    

    render() {
        
        console.log(this.state);

        let action;

        if( this.state.search.type === "job" ) {
            
            action =  (<Container  className="respo" >

            <Form onSubmit={this.checkDate.bind(this)} >

                <Form.Row>
                    
                    <Form.Group as={Col} controlId="formGridState">
                        
                        <Form.Label>Job Type</Form.Label>
                        
                        <Form.Control 
                            as="select" 
                            value={ this.state.search.positionType } 
                            onChange={ this.handleSelectionChange.bind(this, 'positionType') } 
                            name="positionType"
                        >
                            <option value ="-1" disabled > Choose type </option>
                            <option value="0" > Full time </option>
                            <option value="1" > Part time </option>
                            <option value="2" > Freelance </option>
                            <option value="3" > Project </option>
                        </Form.Control>
                    
                    </Form.Group>
                    
                {  
                    this.state.search.positionType === "0" && 
                    <Form.Group as={Col} controlId="formGridState"  id="full">
                       
                        <Form.Label>Full Time -> Available Positions</Form.Label>
                       
                        <Form.Control 
                            as="select" 
                            value={this.state.search.positionName} 
                            onChange={ this.handleSelectionChange.bind(this, 'positionName') }  
                            name = "positionName"
                        >
                            <option value ="-2" disabled > Choose job </option>
                            <option value="0-a" > Front-End Developer(React) </option>
                            <option value="0-b" > Back-End Developer(Laravel) </option>
                            <option value="0-c" > UI/UX Designer </option>
                        </Form.Control>
                    
                    </Form.Group>
                }
                
                {
                    this.state.search.positionType === "1" && 
                    <Form.Group as={Col} controlId="formGridState"  id="part">
                        <Form.Label>Part Time -> Available Positions</Form.Label>
                        <Form.Control 
                            as="select" 
                            value={ this.state.search.positionName } 
                            onChange={ this.handleSelectionChange.bind(this, 'positionName') }   
                            name = "positionName" 
                        >
                            <option value ="-2" > Choose job</option>
                            <option value="1-a" > Security Engineer </option>
                            <option value="1-b" > DevOps(Kubernetes) </option>
                            <option value="1-c" > ML Engineer </option>
                        </Form.Control>
                    </Form.Group>
                }
                
                
                {
                    this.state.search.positionType === "2" && 
                    <Form.Group as={Col} controlId="formGridState"  id="free"> 
                        <Form.Label>Freelance->Available Positions</Form.Label>
                        <Form.Control 
                            as="select" 
                            value={ this.state.search.positionName } 
                            onChange={ this.handleSelectionChange.bind(this, 'positionName') }   
                            name = "positionName" 
                        >
                            <option value ="-2" > Choose job </option>
                            <option value="2-a" > MERN Stack Developer </option>
                            <option value="2-b" > System Analyst </option>
                        </Form.Control>
                    </Form.Group>
                }
                
             
                {   
                    this.state.search.positionType === "3" && 
                    <Form.Group as={Col} controlId="formGridState"  id="project">
                        <Form.Label> Project -> Available Positions </Form.Label>
                        <Form.Control 
                            as="select" 
                            value={ this.state.search.positionName } 
                            onChange={ this.handleSelectionChange.bind(this, 'positionName') }  
                            name="positionName" 
                        >
                            <option value ="-2" disabled > Choose job </option>
                            <option value="3-a" > XY Developer </option>
                            <option value="3-b" > Add Developer </option>
                        </Form.Control>
                    </Form.Group>
                }
                  
                    <Form.Group as={Col} controlId="formGridState" >
                        <Form.Label>Date</Form.Label>
                        <Form.Control 
                            as="select" 
                            value={ this.state.search.customDate } 
                            required 
                            onChange={ this.handleSelectionChange.bind(this, 'customDate') }   
                            name="Date" 
                        >
                            <option disabled > Choose date </option>
                            <option value="30" > This month </option>
                            <option value="60" > Last 2 months </option>
                            <option value="90" > Last 3 months </option>
                            <option value="customDate" > Pick a date </option>
                        </Form.Control>

                    </Form.Group>

                {   
                    this.state.search.customDate === "customDate" && 
                    <Form.Group as={Row} >
                        <Form.Group as={Col}  controlId="formGridState"  >
                            <Form.Label > Start Date </Form.Label>
                            <Form.Control 
                                type="date"  
                                controlid="dateStart" 
                                required
                                onChange={this.handleSelectionChange.bind(this, 'startDate')}
                            />
                        </Form.Group>
                        <Form.Group as={Col}  controlId="formGridState"  >
                            <Form.Label > End Date </Form.Label>
                            <Form.Control 
                                type="date"   
                                controlid="dateEnd" 
                                required
                                onChange={this.handleSelectionChange.bind(this, 'endDate')} 
                            />
                        </Form.Group>
                    </Form.Group>
                }
                    
                </Form.Row>
                   
                { this.renderSubmitButton() }
        
            </Form>

         </Container>);

        }  else if ( this.state.search.type === "intern" ) {
            
            action = (<Container  >

            <Form onSubmit={this.checkDate.bind(this)}>
                
                <Form.Row>  

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Specialities</Form.Label>
                        <Form.Control 
                            as="select" 
                            value={ this.state.search.intern } 
                            name="internType" 
                            onChange={ this.handleSelectionChange.bind(this, 'intern') }
                        >
                            <option disabled value ="-4" > Choose Speciality </option>
                            <option value="0" > React </option>
                            <option value="1" > PHP Laravel </option>
                            <option value="2" > UI/UX </option>
                            <option value="3" > Testing </option>
                        </Form.Control>
                    </Form.Group>
                    
                  
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Date</Form.Label>
                        <Form.Control 
                            as="select"
                            value={ this.state.search.customDate }
                            onChange={this.handleSelectionChange.bind(this, 'customDate')} 
                            name="Date"
                        >
                            <option disabled value="-3" > Choose date</option>
                            <option value="30" > This month</option>
                            <option value="60" > Last 2 months</option>
                            <option value="90" > Last 3 months</option>
                            <option value="customDate" > Pick a date</option>
                        </Form.Control>

                    </Form.Group>
                    
                    {
                        this.state.search.customDate === "customDate" && 
                        <Form.Group as={Row}>
                            <Form.Group as={Col}  controlId="formGridState"  >
                                <Form.Label >Start Date</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    controlid="dateStart"  
                                    onChange={this.handleSelectionChange.bind(this, 'startDate')} 
                                />
                            </Form.Group>
                            <Form.Group as={Col}  controlId="formGridState"  >
                                <Form.Label >End Date</Form.Label>
                                <Form.Control 
                                    type="date"  
                                    controlid="dateEnd"  
                                    onChange={this.handleSelectionChange.bind(this, 'endDate')}
                                />
                            </Form.Group>
                        </Form.Group>
                    }
                  
                    </Form.Row>
                    
                    { this.renderSubmitButton() }
            
            </Form>

         </Container>);
        }

        return (
          
            <main className="content" >
                
                <div className="toolbar"/>
                
                <Container >

                    <div className="d-flex flex-column">
                        
                        <ButtonGroup toggle className="mt-3, c-width" >

                            <ToggleButton 
                                type="radio" 
                                name="radio" 
                                value="job" 
                                checked={ this.state.search.type === 'job' } 
                                onChange={this.choiceHanlde.bind(this)}
                            >
                                Job
                            </ToggleButton>
                            
                            <ToggleButton 
                                type="radio" 
                                name="radio" 
                                value="intern" 
                                checked={this.state.search.type === 'intern'} 
                                onChange={this.choiceHanlde.bind(this)}
                            >
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