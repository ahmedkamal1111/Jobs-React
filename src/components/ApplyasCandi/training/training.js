import React, { Component } from "react";
import { connect } from 'react-redux';
import { Nav } from "react-bootstrap";
import { Col, Row, FormGroup, Label, Input } from "reactstrap";
import Form from 'react-bootstrap/Form';
import Fieldset from "react-bootstrap-form";
import Select from "react-select";
import ScrollAnimation from "react-animate-on-scroll";

import * as actions from '../../../store/actions/index';
import Footer from "../footer/footer";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "./training.css";
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

class Training extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      Gender: [],
      specialities: [],
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
      },
      checked: false,
    };
  }
  
  componentDidMount(){
    // console.log(this.props)
    // const param = this.props.match.params.anything;   
    // this.props.onFetchCompanyInfo(param);
    if (this.props.CID) {
      this.props.onFetchJobApply();
    }
  }

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
    data.append("ff", this.state.formData.ff)
    this.props.onPostJobApply( data );
    this.setState(prevState =>({
      ...prevState,
      formData:{
        Name: '',
        Email: '',
        Mobile: '',
        LinkedIn: '',
        Gender: "",
        Location: "",
        university: "",
        Onlinecv: "",
        Dateofbirth: "",
        ff: "",
      },
    }))
    store.addNotification({
      title: "Thanks",
      message: "Date Sent Successfully",
      width: 225,
      type: "success",
      container: "top-right",
      animationIn: ["animated","fadeIn"],
      animationOut: ["animated","fadeOut"],
      isMobile: true,
      dismiss:{
        duration: 900,
        click: true,
      }
    })
    // this.props.history.push('/aa/tq')
  }

  handleChange = (e) => {
    let n = e.target.name
    let c = e.target.checked
    console.log(n,c)
    this.setState(prevState =>({
      ...prevState,
      formData:{
        ...prevState.formData,
        [n]: c
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

  toggleCheckbox1 = event => {
    console.log(event)
    let n = event.target.name;
    let c = event.target.checked;
    this.setState(prevState => ({
       ...prevState, formData:{ ...prevState.formData,[n]: !c } 
      }));
  };
 

  handleCheck(e) {
    let name = e.target.name;
    let checked = e.target.checked;
    let jobId = e.target.id;
    let jobType = e.target.value;
    this.setState(prevState => ({
      ...prevState,
      [name]: !checked,
      formData:{
        ...prevState.formData,
        jobId,
        jobType,
      }
    }))
  }

  onChange = Dateofbirth => this.setState(prevState =>({
    ...prevState,
    formData:{
      ...prevState.formData,
      Dateofbirth,
    }
  }));
  
  handleSelectionChange = (e) => {
        let v = e.target.value;
        let n = e.target.name;
        this.setState(prevState => ({
            ...prevState,
            formData:{ 
                ...prevState.formData,
                [n]: v
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
  
  render () {

    const { Gender, Location, university  } = this.state.formData;
    return (

      <React.Fragment>

        <div className="container">

          <ScrollAnimation animateIn="bounceInUp">
              <div className="titlestyle">
                <h2>Join our hands on training</h2>
              </div>
          </ScrollAnimation>

          <div className="row">
            <div className="col-md-1" />
            <div className="col-md-10">
              <div className="row">
                
                <div className="col-md-1" />
              </div>
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <Row form>
                  <Col md={8} className="formnamestlye">
                    <FormGroup>
                      <Label className="YourName" for="name">
                        Your Name
                      </Label>
                      
                      <Input
                        type="Text"
                        name="Name"
                        placeholder="Name"
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
                      <Label> Date Of Birth</Label>
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
                </Row>
               
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="number">Specialitiy</Label>
                      <Nav bsStyle="tabs" activeKey="1">
                        {
                          this.props.specialities.map((cbox, k ) => {
                            return (
                                <Form.Check
                                  type="checkbox"
                                  title={cbox.Name}
                                  name={cbox.Name}
                                  value={cbox.typeId}
                                  id={cbox.id}
                                  onClick={this.handleCheck.bind(this)}
                                  // onChange={this.controlCheck.bind(this)}
                                  label={cbox.Name}
                                  inline 
                                >
                                </Form.Check>
                            )
                        })}
                      </Nav>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup className="px-3">
                  <div className="row">
                    <div className="col-md-10" />
                    <div className="col-md-2">
                      <td>
                        <Fieldset Label="">
                          <button className="sendbtn" type="submit" >
                            <h6> Submit</h6>
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
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    CID: state.company.info.cid,
    specialities: state.jobs.jobs.filter(job => job.Job_Type === 5),
    universities: state.jobs.universities,
    locations: state.jobs.locations,
    genders: state.jobs.genders,
  };
};

const mapDispatchToProps = dispatch => {
  
  return {
    onFetchCompanyInfo: (param) => dispatch(actions.fetchCompanyInfo(param)),
    onFetchJobApply: () => dispatch( actions.fetchJobApplyData() ),
    onPostJobApply: ( data ) => dispatch( actions.postJobApply( data ) ),
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( Training );