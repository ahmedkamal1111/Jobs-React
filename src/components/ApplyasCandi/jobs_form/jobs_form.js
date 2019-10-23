import React, { Component } from "react";
import axios from 'axios';
import "./jobs_form.css";
import HashLoader from 'react-spinners/HashLoader';
import "../training/training.css";
import { Col, Form, Row, FormGroup, Label, Input } from "reactstrap";
import Fieldset from "react-bootstrap-form";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import Cover from "../Cover/Cover";
import "moment/locale/it.js";
import "react-datepicker/dist/react-datepicker.css";
import "moment/locale/fr.js";
import "moment/locale/es.js";
import Nav1 from "../navbar/navbar";
import Footer from "../footer/footer";
import ScrollAnimation from "react-animate-on-scroll";

// const options4 = [{ value: "Flutter developer", label: "Flutter developer" }];

class jobs_form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      startDate: new Date(),
      Gender: [],
      specialities: [],
      jobName: [],
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
    // Job Type
    const Job_Type =  this.props.location.state.jobType;
    // const JobName =  this.props.jobname;
    // CID and JObID
     const {cid, id} =  this.props.match.params;
    console.log(Job_Type ,cid, id);

    this.setState(prev => ({
      ...prev,
      isLoading: true 
    }));
    
    axios.get("https://joblaravel.tbv.cloud/show_universities")
    .then(response => {

      this.setState(prev => ({
        ...prev,
        universities: response.data.map(item => {
          return {
            value: item.id,
            label: item.Name
          }
        })
      }));

    }).catch(err => {
      this.setState(prev => ({ ...prev, isLoading: false , err }))
    });

    axios.get("https://joblaravel.tbv.cloud/show_locations")
    .then(response => {
      
      this.setState(prev => ({
        ...prev,
        Locations: response.data.map(item => {
          return {
            value: item.id,
            label: item.Name
          }
        }),
      }))
    }).catch(err => {
      this.setState(prev => ({ ...prev, isLoading: false , err }))
    });
    
    axios.get("https://joblaravel.tbv.cloud/show_genders",)
    .then(response => {
      
      this.setState(prev => ({
        ...prev,
        Gender: response.data.map(item => {
          return { value: item.id, label: item.Name}
        })
      }));

    }).catch(err => {
      this.setState(prev => ({ ...prev, isLoading: false , err }))
    })

    axios.get("https://joblaravel.tbv.cloud/jobs",{
      params:{
        cid: cid
      }
    })
    .then(response => {
      console.log(response.data)
      console.log(id)
      this.setState(prev => ({
        ...prev,
        isLoading: false,
        jobName: response.data.filter(i => i.id === id).map(i => {
          return {
            value: i.Name,

            label: i.Name
          }
        })
      }))
    }).catch(err => {
      this.setState(prev => ({ ...prev, isLoading: false , err }))
    }) 
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
    // console.log(e.target.files)
    // console.log(e.target.files[0])
    // let reader = new FileReader();
    let file = e.target.files[0];
    // let reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.readAsText(file)
    // reader.onload = (e) => {
      // let ff = e.target.result;
      // console.log(e.target.result)
      // console.log(file)
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
    axios.post("https://joblaravel.tbv.cloud/job/store",data,{
      params:{
      CID: "1",
      }
    })
      .then(response => console.log(response.data))
  

  }

  render() {

    // const { selectedOption1, selectedOption2 , selectedOption4  } = this.state;
    const { Gender } = this.state.formData;
    const { Location } = this.state.formData;
    const { university } = this.state.formData;
    const { jobName } = this.state;
    // console.log(this.props.location.state.jobType);

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
                          value={jobName}
                          onChange={this.handleChange_4}
                          options={this.state.jobName}
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
                          options={this.state.Gender}
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
                          options={this.state.Locations}
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
                          required="true"
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
                        // className="pickerstyle"
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
                        // onClick={this.fileUploadHandler.bind(this)}
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
                        options={this.state.universities}
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

export default jobs_form;
