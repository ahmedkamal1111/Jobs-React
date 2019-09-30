import React, { Component } from 'react';
import { Form, Button, Col, Container } from 'react-bootstrap';
import './action.css';


export default class MyForm extends Component {

    constructor(){
        super()
        this.showDate = this.showDate.bind(this)
    }

    checkDate(event) {
        
        let startDate = new Date (document.getElementById("date1").value);
        
        let endDate = new Date(document.getElementById("date2").value);
        
        let diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        
        let diffDays = Math.ceil( diffTime / (1000 * 60 * 60 * 24) );
        
        if( diffDays > 90 ){
            event.preventDefault();
            return false;
        }
       
    }

    showDate(event){
        
        if( event.target.options[event.target.selectedIndex].text === "Pick a date" ){
            
            document.getElementById("dateStart").style.display ="block";
            
            document.getElementById("dateEnd").style.display ="block";
        
        } else{
            
            document.getElementById("dateStart").style.display ="none";
            
            document.getElementById("dateEnd").style.display ="none";
           
        }
        // if(name.options[name.selectedIndex].text == "show") {
        //    document.getElementById("dateOption").style.display ="block";
        // }
        // else{
        //     document.getElementById("dateOption").style.display = "none";
        // }
    }

    getJobDetails(e){
        
        if( e.target.options[e.target.selectedIndex].value === "0" ){
            document.getElementById("full").style.display="block"
        }else {
            document.getElementById("full").style.display="none"
        }

        if(e.target.options[e.target.selectedIndex].value === "1"){
            document.getElementById("part").style.display="block"
        }else {
            document.getElementById("part").style.display="none"
        }
    
        if( e.target.options[e.target.selectedIndex].value === "2"){
            document.getElementById("free").style.display="block"
        } else {
            document.getElementById("free").style.display="none"
        }
         if(e.target.options[e.target.selectedIndex].value === "3"){
            document.getElementById("project").style.display="block"
        }else {
            document.getElementById("project").style.display="none"
        }
        
    }
    
    render() {

        if (this.props.Type === "job") {
            
            return (

                <Container style={{ width: 1200 }} >
             
                    <Form>
                        <Form.Row>
                            
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Job Type</Form.Label>
                                <Form.Control as="select" onChange={this.getJobDetails}>
                                    <option value="0">Full time</option>
                                    <option value="1">Part time</option>
                                    <option value="2">Freelance</option>
                                    <option value="3">Project</option>      
                                </Form.Control>
                            </Form.Group>
                            
                            <Form.Group as={Col} controlId="formGridState" style={{display:"none"}} id="full">
                               
                                <Form.Label>Full Time->Available Positions</Form.Label>
                               
                                <Form.Control as="select" >
                                    <option value="1">Front-End Developer(React)</option>
                                    <option value="2">Back-End Developer(Laravel)</option>
                                    <option value="3">UI/UX Designer</option>
                                </Form.Control>
                            
                            </Form.Group>
                        
                        
                            <Form.Group as={Col} controlId="formGridState" style={{ display:"none" }} id="part">
                            
                                <Form.Label> Part Time -> Available Positions</Form.Label>
                            
                                <Form.Control as="select" >
                                    <option value="1">Security Engineer</option>
                                    <option value="2">DevOps(Kubernetes)</option>
                                    <option value="3">ML Engineer</option>
                                </Form.Control>
                           
                            </Form.Group>
                        
                        
                            <Form.Group as={Col} controlId="formGridState" style={{display:"none"}} id="free"> 
                                
                                <Form.Label>Freelance->Available Positions</Form.Label>
                                
                                <Form.Control as="select" >
                                    <option value="1">MERN Stack Developer</option>
                                    <option value="2">System Analyst</option>
                                    
                                </Form.Control>
                            
                            </Form.Group>
                        
                     
                            <Form.Group as={Col} controlId="formGridState" style={{display:"none"}} id="project">
                            
                                <Form.Label>Project->Available Positions</Form.Label>
                            
                                <Form.Control as="select" >
                                    <option value="1">XY Developer</option>
                                    <option value="2">Add Developer</option>
                                </Form.Control>
                            
                            </Form.Group>
                          
                            <Form.Group as={Col} controlId="formGridState">
                            
                                <Form.Label>Date</Form.Label>
                            
                                <Form.Control as="select" onChange={this.showDate}>
                                    <option>This month</option>
                                    <option>Last 2 months</option>
                                    <option>Last 3 months</option>
                                    <option id="customDate" value="show">Pick a date</option>
                                </Form.Control>
      
                            </Form.Group>
                            
                            <Form.Group as={Col} style={{display:"none"}} controlId="formGridState" id="dateStart" >
                                <Form.Label >Start Date</Form.Label>
                                <Form.Control type="date"  />
                            </Form.Group>
                            
                            <Form.Group as={Col} style={{display:"none"}} controlId="formGridState" id="dateEnd" >
                                <Form.Label >End Date</Form.Label>
                                <Form.Control type="date"  />
                            </Form.Group>
                                        
                            </Form.Row>
            
                            <div className="text-center pt-3" >
                                <Button variant="primary" type="submit"  onClick={this.checkDate} >
                                    Search
                                </Button>
                            </div>
                    
                    </Form>

                 </Container>
                
            );
        }

        if( this.props.Type === "intern" ) {
            
            return (

                <Container style={{ width: 1200 }} >

                    <Form>
                        
                        <Form.Row>
                            
                            <Form.Group as={Col} controlId="formGridState">
                            
                                <Form.Label>Specialities</Form.Label>
                            
                                <Form.Control as="select" >
                                    <option value="0">React</option>
                                    <option value="1">PHP Laravel</option>
                                    <option value="2">UI/UX</option>
                                    <option value="3">Testing</option>
                                    
                                </Form.Control>
                            
                            </Form.Group>
                            
                          
                            <Form.Group as={Col} controlId="formGridState">
                        
                                <Form.Label>Date</Form.Label>
                        
                                <Form.Control as="select" onChange={this.showDate}>
                                    <option>This month</option>
                                    <option>Last 2 months</option>
                                    <option>Last 3 months</option>
                                    <option id="customDate" value="show">Pick a date</option>
                                </Form.Control>
      
                            </Form.Group>
                            
                            <Form.Group as={Col} style={{display:"none"}} controlId="formGridState" id="dateStart" >
                        
                                <Form.Label >Start Date</Form.Label>
                        
                                <Form.Control type="date"  />
                        
                            </Form.Group>
                        
                            <Form.Group as={Col} style={{display:"none"}} controlId="formGridState" id="dateEnd" >
                        
                                <Form.Label >End Date</Form.Label>
                        
                                <Form.Control type="date"  />
                        
                            </Form.Group>
                         
                            </Form.Row>

                            <div className="text-center pt-3" >
                                
                                <Button variant="primary" type="submit"  onClick={this.checkDate} >
                                    Search
                                </Button>
                            
                            </div>
                    
                    </Form>

                 </Container>
            )
        }
    }
}