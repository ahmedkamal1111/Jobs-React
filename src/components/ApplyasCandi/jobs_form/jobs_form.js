import React, { Component } from "react";
import "./jobs_form.css";
import "../training/training.css";
import {
  Button,
  Col,
  Form,
  Row,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";
import Fieldset from "react-bootstrap-form";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { Nav, NavItem, Checkbox } from "react-bootstrap";
import "moment/locale/it.js";
import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import "moment/locale/fr.js";
import "moment/locale/es.js";
import Nav1 from "../navbar/navbar";
import Footer from "../footer/footer";
import ScrollAnimation from "react-animate-on-scroll";
import axios from 'axios';



class jobs_form extends Component {
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
        salary: null
      },
      checked: false,


    };
  }

  componentDidMount(){
    axios.get("https://joblaravel.tbv.cloud/show_universities")
      .then(response => {
        this.setState({
          universities: response.data.map(item => {
            return {
              value: item.id,
              label: item.Name
            }
          })
        })
      })
      axios.get("https://joblaravel.tbv.cloud/show_locations")
      .then(response => {
        // console.log(response.data)
        this.setState({
          Locations: response.data.map(item => {
            return {
              value: item.id,
              label: item.Name
            }
          })
        })
      })
      axios.get("https://joblaravel.tbv.cloud/show_genders",)
      .then(response => {
        this.setState({
          Gender: response.data.map(item => {
            return { value: item.id, label: item.Name}
          })
        })
      })

      axios.get("https://joblaravel.tbv.cloud/jobs",{
        params:{
          cid: "1"
        }
      })
      .then(response => {
        // console.log(response.data)
        this.setState({
          specialities: response.data.filter(item => item.Job_Type === 5).map(item => {
            return {
              id: item.id,
              Name: item.Name,
              typeId: item.Job_Type
            }
          })
        })
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
  state = {
    selectedOption1: null,
    selectedOption2: null,
    selectedOption3: null,
    selectedOption4: null
  };
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

  onChange = date => this.setState({ date });

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
      data.append("JobType",1)
      data.append("jobId",7)
      axios.post("https://joblaravel.tbv.cloud/job/store",data,{
        params:{
        CID: "1",
        }
      })
        .then(response => console.log(response.data))
    
  
    }

  render() {
    const { selectedOption1 } = this.state;
    const { selectedOption2 } = this.state;
    const { selectedOption4 } = this.state;
    const { Gender } = this.state.formData;
    const { Location } = this.state.formData;
    const { university } = this.state.formData;
    console.log(this.props);
    return (
      <React.Fragment>
        <Nav1 />
        <div className=" jumbotron3 ">
          <br />
          <h3> JOBS </h3>
          <br />
          <br />
          <br />
        </div>
        <div className="container jobsformcomponentstyle">
          <ScrollAnimation animateIn="bounceInUp	" isVisible={true}>
            <div className="row ">
              <div className="col-md-4" />
              <div className="col-md-4 titlestyle text-center">
                <h2>apply for our jobs now</h2>
              </div>
              <div className="col-md-4" />
            </div>
          </ScrollAnimation>

          <div className="row">
            <div className="col-md-1" />
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-1" />
                <ScrollAnimation
                  animateIn="bounceInUp	"
                  isVisible={true}
                  delay={50}
                >
                  <div className="col-md-10">
                    <p className="descriptionParagraphStyle text-center">
                      Here in TEQNEIA we are always happy to meet new life
                      filled passionate individuals, feel free to leave your cv
                      or apply to one of our open jobs!
                    </p>
                  </div>
                </ScrollAnimation>

                <div className="col-md-1" />
              </div>

              <Form onSubmit={this.handleSubmit.bind(this)}>
                <Row form>
                  <Col md={12} className="formnamestlye">
                    <FormGroup>
                      <Label className="Job type" for="jop tybe">
                        Job type
                      </Label>

                      <Select
                        value={selectedOption4}
                        onChange={this.handleChange_4}
                        // options={options4}
                        required="true"
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
                      <Label> Date Of Birth</Label>
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

                <FormGroup className="float-right px-3">
                  <div className="row">
                    <div className="col-md-10" />
                    <div className="col-md-2">
                      {" "}
                      <td>
                        <Fieldset Label="">
                          <button className="btn btn-primary " type="submit">
                            <h6> Apply</h6>{" "}
                          </button>
                        </Fieldset>
                      </td>
                    </div>
                  </div>
                </FormGroup>
              </Form>
            </div>
            <div className="col-md-1" />
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default jobs_form;
