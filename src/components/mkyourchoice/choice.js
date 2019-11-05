import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { 
    Form, 
    Button, 
    Row, Col, 
    Container,
    ToggleButton, 
    ButtonGroup 
} from 'react-bootstrap';
import axios from "axios";
import DataTable from '../../containers/DataTable/Datatable';

import './action.css';

class MakeYourChoice extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            isLoading: false,
            jobId: null,
            searchResults:[],
            response: false,
            search: {
                type: '',
                positionType: "disabled",
                positionName: "disabled",
                customDate: "disabled",
                intern: "disabled",
                startDate: "",
                endDate: "",
            },
            pickDate: [
                { value: 'disabled', name: 'Choose Date'},
                { value:  1, name: 'Last month'},
                { value:  2, name: 'Last 2 months'},
                { value:  3, name: 'Last 3 months'},
                { value:  'customDate', name: 'Pick a Range Date'},
            ],
            columns: [
                { 
                  title: 'Id', 
                  field: 'id', 
                  filtering: false,
                  editable: 'never',  
                },
                { 
                  title: 'Name', 
                  field: 'name', 
                  filterPlaceholder: 'name',
                  editable: 'never',  
                },
                { 
                  title: 'Date', 
                  field: 'date', 
                  filterPlaceholder: 'Date',
                  editable: 'never',  
                },
                { 
                  title: 'Status', 
                  field: 'status', 
                  filterPlaceholder: 'Status',
                  lookup: { 
                    0: 'New', 
                    1: 'Shortlisted', 
                    2: 'Rejected'
                  }, 
                },
                { 
                  title: 'Location', 
                  field: 'location', 
                  filterPlaceholder: 'Location',
                  editable: 'never'  
                }
              ],
        }
    }

    componentDidMount() {
        this.onFetchJobTypes();
        this.onFetchJobPositions();
    }

    handleSubmit(e) {
        e.stopPropagation();
        e.preventDefault();
        
        this.state.JobName.map((N, I) => {
            if( this.state.search.positionName === N.Name) {    
                this.state.jobId = N.Job_Type;
            }
            return true;
        })

        // this.checkDate();
        if(this.state.search.type === "job") {
            axios.post("https://joblaravel.tbv.cloud/filter",{
                jobType: this.state.jobId,
                jobName: this.state.search.positionName,
                startDate: this.state.search.startDate ?  this.state.search.startDate : null ,
                endDate: this.state.search.endDate ? this.state.search.endDate : this.state.search.customDate,

            },{
                params:{
                    CID: "1",
                }
            })
               .then(response => {
                this.setState(prev => ({
                    ...prev,
                    searchResults: response.data,
                    response: true,
                    search:{
                        ...prev.search,
                        startDate: null,
                        endDate: null,
                        customDate: "disabled",
                    },
                }))
            })
            .catch (error=>{console.log(error.message)})
            
        }

        if( this.state.search.type === "intern" ) {
            axios.post("https://joblaravel.tbv.cloud/filter",{
                jobType:  5,
                jobName: this.state.search.intern,
                startDate: this.state.search.startDate ?  this.state.search.startDate : null ,
                endDate: this.state.search.endDate ? this.state.search.endDate: this.state.search.customDate,
            },  {
                params: {
                    CID: "1",
                }
            })
               .then(response => {
                    this.setState(prev => ({
                        ...prev,
                        searchResults: response.data,
                        response: true,
                        search:{
                            ...prev.search,
                            startDate: null,
                            endDate: null,
                            customDate: "disabled",
                        },
                    }))
            })
            .catch (error=>{console.log(error.message)})            
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
    // checkDate = e => {
    //     const start = document.getElementById("startDate");
    //     const end = document.getElementById("endDate");
    //     console.log(end.getTime(),start.getTime())
    //     let diffTime = Math.abs( end - start );
    //     let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        
    //     console.log(diffDays)
    //     if(diffDays > 90) {
    //         alert(diffDays)
    //         e.preventDefault();
    //     }
    // }

    //toggle between intern and job
    choiceHanlde = e => {
        let v = e.target.value;
        this.setState(prev => ({
            ...prev,
            searchResults:[],
            response: false,
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
    renderSubmitButton = () => {
        const {
            positionType,
            positionName,
            customDate,
            intern,
            startDate,
            endDate,
        } = this.state.search;

        let v = false;
        
        if ( ( (positionType !== "disabled" && positionName !== "disabled") || intern !== "disabled") && (customDate !== "disabled" || (endDate && startDate))) {
            v = true;
        }
        
        return (
            <div className="text-center pt-3" >
                <Button variant="primary search" type="submit" disabled={!v} > Search </Button>
            </div>
        )
    };

    //render options debpend on form control selection name
    renderOptions = ( options ) => (
        options.map((option, index) => (
            <option 
                key={`${Math.random()}-${index}`} 
                value={option.value} 
                disabled={ option.value === 'disabled' ? true : null } 
            > 
                { option.name }  
                { option.Name }
                 
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
        <Form.Group as={Col} className="rangeDate"  controlId="formGridState"  >
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
        <div className="d-flex flex-column toggle">
            <ButtonGroup toggle className="mt-3 c-width" >
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
        const { pickDate } = this.state;
        const { jobType ,internPosition } = this.props;
        const { fullTime, project ,partTime, freelance } = this.props.positions;
        const { type, positionType, positionName, customDate, intern } = this.state.search;

        if( type === "job" ) {
            action =  (
                <Container  className="respo" >
                    <Form  id="myForm" className="searchForm" encType="multipart/form-data" onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Row>
                            { this.renderFormGroup( 'Job Type', positionType, 'positionType', jobType) }
                            { positionType === "Full Time" ? this.renderFormGroup('Positions', positionName, 'positionName', fullTime) : null }
                            { positionType === "Project" ? this.renderFormGroup('Positions', positionName, 'positionName', project) : null }
                            { positionType === "Part Time" ? this.renderFormGroup('Positions', positionName, 'positionName', partTime) : null }
                            { positionType === "Freelance" ? this.renderFormGroup('Positions', positionName, 'positionName', freelance) : null }
              
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
                    <Form  id="myForm" className="searchForm" encType="multipart/form-data" onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Row>  
                            { this.renderFormGroup("Specialities", intern, "intern", internPosition) } 
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
                <Container>
                    { this.renderToggleButton( type ) }
                    { action }
                    { 
                        this.state.response === true ? 
                            <DataTable data={this.state.searchResults} columns={this.state.columns} flag={0}/> 
                            :
                            <div className="alert alert-info feedback" role="alert">
                                Choose your search preferences first.
                            </div>
                    }
                </Container>
            </main>          
        );
    }
}

const mapStateToProps = state => {
    return {
        jobType: state.candidates.jobTypes.filter(jobType => jobType.id !== 5),
        positions: state.candidates.positions,
        jobName: state.candidates.jobName,
        internPosition: state.candidates.internPosition,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchJobTypes: () => dispatch(actions.fetchJobTypes()),
        onFetchJobPositions: () => dispatch(actions.fetchJobPositions()),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( MakeYourChoice );