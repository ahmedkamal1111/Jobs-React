import React, { Component } from "react";
import { connect } from "react-redux";
import HashLoader from 'react-spinners/HashLoader';
import ScrollAnimation from "react-animate-on-scroll";
import { Col, Form, Row, FormGroup, Label, Input } from "reactstrap";
import Fieldset from "react-bootstrap-form";
import Select from "react-select";

import * as actions from "../../../store/actions/index";
import Cover from "../Cover/Cover";
import Nav1 from "../navbar/navbar";
import Footer from "../footer/footer";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "./jobs_form.css";
import "../training/training.css";
import "moment/locale/it.js";
import "react-datepicker/dist/react-datepicker.css";
import "moment/locale/fr.js";
import "moment/locale/es.js";

class jobs_form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      formData:{
        Name: '',
        Email: '',
        Mobile: null,
        LinkedIn: '',
        Gender: "",
        Location: "",
        university: "",
        Onlinecv: "",
        Dateofbirth: "",
        ff: "",
        jobId: null,
        jobType: null,
        salary: null
      },
      checked: false,
    };
  }

  componentDidMount () {
    const id =  this.props.match.params.id;
    const param = this.props.match.params.anything;
    if( !this.props.CID && true) {
      const cid = localStorage.getItem('CID');
      this.props.onFetchApplyJobData();
      this.props.onFetchCompanyInfo(param);
      this.props.onFetchJobs(cid);
      this.props.onFetchJobDetail(cid, id);
    }
  }

  handleChange__1(date) {
    this.setState({
      startDate: date
    });
  }

  handleSubmit__1(e) {
    e.preventDefault();
    let main = this.state.startDate;
    console.log(main.format("L"));
  }

  handleChange2(date) {
    this.setState({
      startDate: date
    });
  }

  handleChange_1 = selectedOption1 => {
    this.setState({ selectedOption1 });
  };

  handleChange_2 = selectedOption2 => {
    this.setState({ selectedOption2 });
  };

  handleChange_3 = selectedOption3 => {
    this.setState({ selectedOption3 });
  };

  handleChange_4 = selectedOption4 => {
    this.setState({ selectedOption4 });
  };
  toggleCheckbox1 = event => {
    this.setState({ frontend: !this.state.frontend });
  };
  toggleCheckbox2 = event => {
    this.setState({ backend: !this.state.backend });
  };

  handleForm = (e) => {
    let v = e.target.value;
    let n = e.target.name;
    this.setState(prevState => ({
      ...prevState,
      formData:{
        ...prevState.formData,
        [n]: v,
      }
    }))
  }
  
  getFile = (e) => {
    e.preventDefault()
    let file = e.target.files[0];
      this.setState(prevState =>({
        ...prevState,
        formData:{
          ...prevState.formData,
          ff: file,
        }
    }));
      
  }

  handleChange_1 = Gender => {
    this.setState(prevState =>({
      ...prevState,
      formData:{
        ...prevState.formData,
        Gender: Gender.value,
      }
    }));
 
  };

  handleChange_2 = Location => {
    this.setState(prevState =>({
      ...prevState,
      formData:{
        ...prevState.formData,
        Location: Location.value,
      }
    }));
 
  };

  handleChange_3 = university =>{
    this.setState(prevState =>({
      ...prevState,
      formData:{
        ...prevState.formData,
        university: university.value
      }
    }));
 
  };

  onChange = date => this.setState({ date });

  handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = new FormData()
    data.set('Name',this.state.formData.Name)
    data.append('Email',this.state.formData.Email)
    data.append('Mobile',this.state.formData.Mobile)
    data.append('LinkedIn',this.state.formData.LinkedIn)
    data.append('Gender',this.state.formData.Gender)
    data.append('Location',this.state.formData.Location)
    data.append('university',this.state.formData.university)
    data.append('Onlinecv',this.state.formData.Onlinecv)
    data.append('Dateofbirth',this.state.formData.Dateofbirth)
    data.append('jobId',this.state.formData.jobId)
    data.append('JobType',this.state.formData.jobType)
    data.append('salary',this.state.formData.salary)
    data.append("ff", this.state.formData.ff)
    data.append("JobType",this.props.location.state.jobType)
    data.append("jobId",this.props.match.params.id)
    console.log(this.state.formData.Location);
    console.log(this.state.formData.ff);
    this.props.onPostJobApply(data);
  }

  render() {

    const { Gender , university , Location } = this.state.formData;

    let comp = (
      <div className="loading">
        <div className="sweetLoading">
          <HashLoader
              sizeUnit={"px"}
              size={50}
              color={'#0C407C'}
              margin="2px"
              loading={this.state.isLoading}
          />
        </div> 
      </div>
    )
    
    if(!this.state.isLoading) {
      comp = (
            <div className="container jobsformcomponentstyle">
            <ScrollAnimation animateIn="bounceInUp">
              <div className="row">
                <div className="col-md titlestyle">
                  <h2>Apply for the Job now</h2>
                </div>
              </div>
            </ScrollAnimation>

            <div className="row">
              <div className="col-md-1" />
              <div className="col-md-10">
                <Form onSubmit={this.handleSubmit.bind(this)}>
                  <Row form>
                    <Col md={12} className="formnamestlye">
                      <FormGroup>
                        <Label className="Job type" for="jop tybe">
                          Job position
                        </Label>

                        <Select
                          value={this.props.jobApplied}
                          onChange={this.handleChange_4}
                          options={this.props.jobApplied}
                          required="true"
                          isDisabled="true"
                          
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={8} className="formnamestlye">
                      <FormGroup>
                        <Label className="YourName" for="name">
                          Your Name
                        </Label>

                        <Input
                        type="Text"
                        name="Name"
                        placeholder="Username"
                        required="true"
                        value={this.state.formData.Name}
                        onChange={this.handleForm.bind(this)}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4} className="formemailstlye">
                      <FormGroup>
                        <Label>Gender</Label>
                        <Select
                          value={Gender.value}
                          name="Gender"
                          onChange={this.handleChange_1}
                          options={this.props.genders}
                          required="true"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row form>
                    <Col md={8} className="formnamestlye">
                      <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input
                          type="email"
                          name="Email"
                          required="true"
                          placeholder="Your Email@host.com"
                          value={this.state.formData.Email}
                          onChange={this.handleForm.bind(this)}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4} className="formemailstlye">
                      <FormGroup>
                        <Label>Location</Label>
                        <Select
                          value={Location.value}
                          onChange={this.handleChange_2}
                          options={this.props.locations}
                          required="true"
                          name="Location"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row form>
                    <Col md={8} className="formnamestlye">
                      <FormGroup>
                        <Label className="YourName">Online cv</Label>

                        <Input
                          type="Text"
                          name="Onlinecv"
                          placeholder="Online CV (Compulsory only if CV is not attached)"
                          value={this.state.formData.Onlinecv}
                          onChange={this.handleForm.bind(this)}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4} className="formemailstlye">
                      <FormGroup>
                        <Label>Date Of Birth</Label>
                        <br />
                        <Input
                        type="date"
                        id="date"
                        value={this.state.formData.Dateofbirth}
                        onChange={this.handleForm.bind(this)}
                        required="true"
                        name="Dateofbirth"
                      />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row form>
                    <Col md={8} className="formnamestlye">
                      <FormGroup>
                        <Label className="YourName">Upload cv</Label>

                        <input
                        type="file"
                        name="ff"
                        onChange={this.getFile.bind(this)}
                        className="form-control"
                        placeholder="Compulsory only if no link of online CV is not provided"
                        required="true"
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4} className="formemailstlye">
                      <FormGroup>
                        <Label>Mobile</Label>
                        <Input
                            type="text"
                            name="Mobile"
                            required="true"
                            placeholder="Mobile"
                            value={this.state.formData.Mobile}
                            onChange={this.handleForm.bind(this)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row form>
                    <Col md={8} className="formnamestlye">
                      <FormGroup>
                        <Label className="YourName">LinkedIn Profile</Label>
                        <Input
                        type="text"
                        required="true"
                        name="LinkedIn"
                        placeholder="your linkein profile"
                        value={this.state.formData.LinkedIn}
                        onChange={this.handleForm.bind(this)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4} className="formemailstlye">
                    <FormGroup>
                      <Label>University</Label>
                      <Select
                        required="true"
                        value={university.value}
                        onChange={this.handleChange_3}
                        options={this.props.universities}
                        name="university"
                      />
                    </FormGroup>
                  </Col>

                    <Col md={4} className="formemailstlye">
                      <FormGroup>
                        <Label>Expected salary</Label>
                        <Input
                            type="number"
                            min="100"
                            max="20000"
                            name="salary"
                            required=""
                            value={this.state.formData.salary}
                            onChange={this.handleForm.bind(this)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <FormGroup className="px-3">
                    <div className="row">
                      <div className="col-md-10" />
                      <div className="col-md-2">
                        <td>
                          <Fieldset Label="">
                            <button className="sendbtn" type="submit">
                              <h6> Submit </h6>
                            </button>
                          </Fieldset>
                        </td>
                      </div>
                    </div>
                  </FormGroup>
                </Form>
              </div>
            </div>
          </div>
      )
    }

    return (
      <React.Fragment>

          <Nav1 />

          <Cover />
            { comp }
          <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    CID: state.company.info.cid,
    jobs: state.jobs.jobs,
    universities: state.jobs.universities,
    locations: state.jobs.locations,
    genders: state.jobs.genders,
    jobApplied: {value: state.jobs.jobName, label: state.jobs.jobName},
  };
};

const mapdispatchToProps = dispatch => {
  return {
    onFetchApplyJobData: () => dispatch(actions.fetchJobApplyData()),
    onFetchCompanyInfo: (param) => dispatch(actions.fetchCompanyInfo(param)),
    onFetchJobDetail: (cid, id) => dispatch(actions.fetchJobDetail(cid, id)),
    onFetchJobs: ( id ) => dispatch(actions.fetchJobs( id )),
    onPostJobApply: ( data ) => dispatch(actions.postJobApply( data )),
  };
};

export default connect( mapStateToProps, mapdispatchToProps )( jobs_form );