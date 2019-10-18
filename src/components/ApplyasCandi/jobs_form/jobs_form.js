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
import Nav1 from "../applyasCandidate/navbar/navbar";
import Footer from "../footer/footer";
import ScrollAnimation from "react-animate-on-scroll";

const options = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" }
];
const options2 = [
  { value: "Giza (Zayed)", label: "Giza (Zayed)" },
  { value: "Giza (October)", label: "Giza (October)" },
  { value: "Giza (Haram)", label: "Giza (Haram)" },
  { value: "Giza (Faisal)", label: "Giza (Faisal)" },
  { value: "Giza (Mohandeseen)", label: "Giza (Mohandeseen)" },
  { value: "Giza", label: "Giza" },
  { value: "Cairo (down Town)", label: "Cairo (down Town)" },
  { value: "Cairo (Maadi)", label: "Cairo (Maadi)" },
  { value: "Cairo (Helwan)", label: "Cairo (Helwan)" },
  { value: "Cairo (Zamalek)", label: "Cairo (Zamalek)" },
  {
    value: "Cairo (Nasr City/Heliopolice)",
    label: "Cairo (Nasr City/Heliopolice)"
  },
  { value: "Cairo (5th settlement)", label: "Cairo (5th settlement)" },
  { value: "Cairo", label: "Cairo" },
  { value: "Alexandria", label: "Alexandria" },
  { value: "Aswan", label: "Aswan" },
  { value: "Asyut", label: "Asyut" },
  { value: "Beheira", label: "Beheira" },
  { value: "Beni Suef", label: "Beni Suef" },
  { value: "Dakahlia", label: "Dakahlia" },
  { value: "Damietta", label: "Damietta" },
  { value: "Gharbia", label: "Gharbia" },
  { value: "Ismailia", label: "Ismailia" },
  { value: "Kafr El Sheikh", label: "Kafr El Sheikh" },
  { value: "Luxor", label: "Luxor" },
  { value: "Matruh", label: "Matruh" },
  { value: "Minya", label: "Minya" },
  { value: "Monufia", label: "Monufia" },
  { value: "New Valley", label: "New Valley" },
  { value: "North Sinai", label: "North Sinai" },
  { value: "Port Said", label: "Port Said" },
  { value: "Qalyubia", label: "Qalyubia" },
  { value: "Qena", label: "Qena" },
  { value: "Red Sea", label: "Red Sea" },
  { value: "Sharqia", label: "Sharqia" },
  { value: "Sohag", label: "Sohag" },
  { value: "South Sinai", label: "South Sinai" },
  { value: "Suez", label: "Suez" }
];

const options4 = [{ value: "Flutter developer", label: "Flutter developer" }];

class jobs_form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment()
    };
    this.handleChange__1 = this.handleChange__1.bind(this);
    this.handleSubmit__1 = this.handleSubmit__1.bind(this);
  }

  state = {
    date: new Date()
  };
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

  render() {
    const { selectedOption1 } = this.state;
    const { selectedOption2 } = this.state;
    const { selectedOption4 } = this.state;

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
                        options={options}
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
                        options={options2}
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

                <FormGroup className="float-right px-3">
                  <div className="row">
                    <div className="col-md-10" />
                    <div className="col-md-2">
                      {" "}
                      <td>
                        <Fieldset Label="">
                          <button className="btn btn-primary " type="submit">
                            <h6> Send Message</h6>{" "}
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
