import React, { Component } from "react";
import axios from 'axios';
import "./jobs_form.css";
import "../training/training.css";
import { Col, Form, Row, FormGroup, Label, Input } from "reactstrap";
import Fieldset from "react-bootstrap-form";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import Cover from "../Cover/Cover";
import "moment/locale/it.js";
import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";
import "moment/locale/fr.js";
import "moment/locale/es.js";
import Nav1 from "../navbar/navbar";
import Footer from "../footer/footer";
import ScrollAnimation from "react-animate-on-scroll";

const options4 = [{ value: "Flutter developer", label: "Flutter developer" }];

class jobs_form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      err: null,
      startDate: new Date(),
      Gender: [],
      specialities: [],
      formData: {
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
        frontend: false,
        backend: false,
      }
    };
    this.handleChange__1 = this.handleChange__1.bind(this);
    this.handleSubmit__1 = this.handleSubmit__1.bind(this);
  }

  componentDidMount () {
    //Job Type
    const Job_Type =  this.props.location.state.jobType;
    //CID and JObID
    const {cid, id} =  this.props.match.params;
    console.log(Job_Type, cid, id);

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

  onChange = date => this.setState({ date });

  render() {

    const { selectedOption1, selectedOption2 , selectedOption4  } = this.state;

    return (
      
      <React.Fragment>

          <Nav1 />

          <Cover />

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
                <Form>
                  <Row form>
                    <Col md={12} className="formnamestlye">
                      <FormGroup>
                        <Label className="Job type" for="jop tybe">
                          Job type
                        </Label>

                        <Select
                          value={selectedOption4}
                          onChange={this.handleChange_4}
                          options={options4}
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
                          name="username"
                          placeholder="Username"
                          required="true"
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4} className="formemailstlye">
                      <FormGroup>
                        <Label>Gender</Label>
                        <Select
                          value={selectedOption1}
                          onChange={this.handleChange_1}
                          // options={options}
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
                          name="email"
                          required="true"
                          placeholder="Your Email@host.com"
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4} className="formemailstlye">
                      <FormGroup>
                        <Label>Location</Label>
                        <Select
                          value={selectedOption2}
                          onChange={this.handleChange_2}
                          // options={options2}
                          required="true"
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
                          name="username"
                          placeholder="Online CV (Compulsory only if CV is not attached)"
                          required="true"
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4} className="formemailstlye">
                      <FormGroup>
                        <Label>Date Of Birth</Label>
                        <br />
                        <DatePicker
                          onChange={this.onChange}
                          value={this.state.date}
                          className="datepickerstyle"
                          required="true"
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
                          name="ff[]"
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
                          name="mobile"
                          required="true"
                          placeholder="mobile"
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
                          name="linkedin"
                          placeholder="your linkein profile"
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
        <Footer />
      </React.Fragment>
    );
  }
}

export default jobs_form;
