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
                positionType: "disabled",
                positionName: "disabled",
                customDate: "disabled",
                intern: "disabled",
                startDate: "",
                endDate: "",
            },
            jobType: [
                { value: 'disabled', name: 'Choose Type'},
                { value:  0, name: 'Full Time'},
                { value:  1, name: 'Part Time'},
                { value:  2, name: 'Freelance'},
                { value:  3, name: 'Project'},
            ],
            pickDate: [
                { value: 'disabled', name: 'Choose Date'},
                { value:  30, name: 'Last month'},
                { value:  60, name: 'Last 2 months'},
                { value:  90, name: 'Last 3 months'},
                { value:  'customDate', name: 'Pick a Range Date'},
            ],
            internName: [
                { value: 'disabled', name: 'Choose Speciality'},
                { value:  0, name: 'React'},
                { value:  1, name: 'PHP Laravel'},
                { value:  2, name: 'UI/UX'},
                { value:  3, name: 'Testing'},
            ],
            JobName: {
                0 : [
                    { value: 'disabled', name: 'Choose Job'},
                    { value: 'a-0', name: 'Front-End Developer(React)'},
                    { value: 'a-1', name: 'Back-End Developer(Laravel)'},
                    { value: 'a-2', name: 'UI/UX Designer'},
                ],
                1 : [
                    { value: 'disabled', name: 'Choose Job'},
                    { value: 'b-0', name: 'Security Engineer'},
                    { value: 'b-1', name: 'DevOps(Kubernetes)'},
                    { value: 'b-2', name: 'ML Engineer'},
                ],
                2 : [
                    { value: 'disabled', name: 'Choose Job'},
                    { value: 'c-0', name: 'MERN Stack Developer'},
                    { value: 'c-1', name: 'System Analyst'},
                ], 
                3 : [
                    { value: 'disabled', name: 'Choose Job'},
                    { value: 'd-0', name: 'XY Developer'},
                    { value: 'd-1', name: 'Add Developer'},
                ],
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
                positionType: "disabled",
                positionName: "disabled",
                customDate: "disabled",
                intern: "disabled",
                startDate: null,
                endDate: null,
            }
        }));
    }

    //render submit button
    renderSubmitButton = () => (
        <div className="text-center pt-3" >
            <Button variant="primary" type="submit"> Search </Button>
        </div>
    );

    //render options debpend on form control selection name
    renderOptions = ( options ) => (
        options.map((option, index) => (
            <option 
                key={`${Math.random()}-${index}`} 
                value={option.value} 
                disabled={ option.value === 'disabled' ? true : null } 
            > 
                { option.name } 
            </option>
        ))
    );

    //render Form Group
    renderFormGroup = ( label, value, name, options ) => (
        <Form.Group as={Col} controlId="formGridState">
            <Form.Label> { label } </Form.Label>
            <Form.Control 
                as="select" 
                value={ value } 
                onChange={ this.handleSelectionChange.bind(this, name) } 
                name= { name }
            >
                { this.renderOptions( options ) }          
            </Form.Control>
        </Form.Group>    
    );

    //render start and end date fields
    renderPickDateRange = () => (
        <Form.Group as={Row} >
            { this.renderDateFieldGroup('Start Date', 'startDate')}
            { this.renderDateFieldGroup('End Date', 'endDate') }
        </Form.Group>
    );

    renderDateFieldGroup = (label , id) => (
        <Form.Group as={Col}  controlId="formGridState"  >
            <Form.Label > { label } </Form.Label>
            <Form.Control 
                type="date"   
                controlid={id} 
                required
                onChange={this.handleSelectionChange.bind(this, id)} 
            />
        </Form.Group>
    );
    
    //Render the inter and job toggle buttons
    renderToggleButton = ( type ) => (
        <div className="d-flex flex-column">
            <ButtonGroup toggle className="mt-3, c-width" >
                { this.renderButton("job", "Job", type) }
                { this.renderButton("intern", "Internship", type) }
            </ButtonGroup>
        </div>
    )

    renderButton = (value, name, type) => (
        <ToggleButton 
            type="radio" 
            name="radio" 
            value={value}
            checked={type === value} 
            onChange={ this.choiceHanlde.bind(this) }
        >
            { name }
        </ToggleButton>    
    )

    render() {

        let action;
        //distruct state
        const { jobType, pickDate, internName, JobName } = this.state;
        const { type, positionType, positionName, customDate, intern } = this.state.search;

        if( type === "job" ) {
            action =  (
                <Container  className="respo" >
                    <Form onSubmit={this.checkDate.bind(this)} >
                        <Form.Row>
                            { this.renderFormGroup( 'Job Type', positionType, 'positionType', jobType) }
                            { positionType === "0" ? this.renderFormGroup('Full Time -> Available Positions', positionName, 'positionName', JobName[0]) : null }
                            { positionType === "1" ? this.renderFormGroup('Full Time -> Available Positions', positionName, 'positionName', JobName[1]) : null }
                            { positionType === "2" ? this.renderFormGroup('Full Time -> Available Positions', positionName, 'positionName', JobName[2]) : null }
                            { positionType === "3" ? this.renderFormGroup('Full Time -> Available Positions', positionName, 'positionName', JobName[3]) : null }
              
                            { this.renderFormGroup( 'Date', customDate, 'customDate', pickDate) }
              
                            {  customDate === "customDate" ? this.renderPickDateRange() : null }    
                        </Form.Row>
                    
                        { this.renderSubmitButton() }
                    </Form>
                </Container>
            );
        }  else if ( type === "intern" ) {
            action = (
                <Container>
                    <Form onSubmit={this.checkDate.bind(this)}>
                        <Form.Row>  
                            { this.renderFormGroup("Specialities", intern, "intern", internName) } 
                            { this.renderFormGroup( 'Date',  customDate, 'customDate', pickDate) }
                            { customDate === "customDate" ? this.renderPickDateRange() : null }  
                        </Form.Row>

                        { this.renderSubmitButton() }
                    </Form>
                </Container>
            );
        }

        return (
            <main className="content" >
                <div className="toolbar"/>
                <Container >
                    { this.renderToggleButton( type ) }
                    { action }
                </Container>
            </main>          
        );
    }
}