import React, { Component } from "react";
import "./training.css";
import Form from 'react-bootstrap/Form';
import {
  Col,
  // Form,
  Row,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import Fieldset from "react-bootstrap-form";
import Select from "react-select";
import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { Nav, NavItem, Checkbox } from "react-bootstrap";
import Footer from "../footer/footer";
import ScrollAnimation from "react-animate-on-scroll";
import axios from "axios";
// import Form from 'react-bootstrap/Form'


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
    // this.handleChange2 = this.handleChange2.bind(this);
  }
  //    genders = this.state.Gender.map(i => {
  //   return { value: i.id, label: i.Name}
  // })
  // state = {
  //   date: new Date()
  // };

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
    axios.post("https://joblaravel.tbv.cloud/job/store",data,{
      params:{
      CID: "1",
      }
    })
      .then(response => console.log(response.data))
  }
  handleChange = (e) => {
    let n = e.target.name
    let c = e.target.checked
    console.log(n,c)
    this.setState(prevState =>({
      // startDate: date,
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
    console.log(c)
    this.setState(prevState => ({
       ...prevState, formData:{ ...prevState.formData,[n]: !c } 
      }));
  };
  // toggleCheckbox2 = event => {
  //   // this.setState({ backend: !this.state.backend });
  //   this.setState(prevState => ({ ...prevState, formData:{ ...prevState.formData,backend: !this.state.formData.backend } }));
  // };

  handleCheck(e) {
    // console.log(e.target.id)
    // console.log(e.target.name)
    // console.log(e.target.value)
    let name = e.target.name;
    let checked = e.target.checked;
    let jobId = e.target.id;
    let jobType = e.target.value;
    // console.log(data)
    // console.log(e.target.checked)
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

  controlCheck(e) {
    // console.log(e.target.name)
    // console.log(e.target.checked)
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
      // reader.onloadend = () => {
        
      // }
      // reader.readAsDataURL(file);
    

      // fileUploadHandler = () => {
      //   const file = new FormData();
      //   file.append("ff",this.state.formData.ff);
      //   axios.post("https://joblaravel.tbv.cloud/job/store",file)
      //   .then(response => console.log(response.data))
    
      // };
      

    // onClickHandler = () => {
    //   const data = new FormData(this.state.formData.ff);
     
    //   console.log(data)
    //   // axios.post("http://joblaravel.tbv.cloud/public/cvs/",ff)
    //   // .then(response => console.log(response.data))
    // }

    

  render() {
    // console.log(this.state.formData.Name)
    // console.log(this.state.formData.Email)
    // console.log(this.state.)
    // console.log(this.state.start)
    // console.log(this.state.formData.Mobile)
    // console.log(this.state.formData.LinkedIn)
    // console.log(this.state.formData.university.value)
    // console.log(this.state.formData.Location)
    // console.log(this.state.universities)
    // console.log(this.state.formData.Location)
    // console.log(this.state.formData.Gender)
    // console.log(this.state.formData.university)
    // console.log(this.state.formData.ff)
    // console.log(this.state.formData.ff)
    const { Gender } = this.state.formData;
    const { Location } = this.state.formData;
    const { university } = this.state.formData;
    
    // console.log(this.state.formData.jobId,this.state.formData.jobType);

    return (
      <React.Fragment>

        <div className="container">

          <ScrollAnimation animateIn="bounceInUp">
            <div className="row">
              <div className="titlestyle">
                <h2>Join our hands on training</h2>
              </div>
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
                        options={this.state.universities}
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

                    
                           {this.state.specialities.map((cbox,k) => {
                            return (
                              // <NavItem  >
                                <Form.Check
                                type="checkbox"
                                title={cbox.Name}
                                name={cbox.Name}
                                value={cbox.typeId}
                                id={cbox.id}
                                // checked={this.state.checked}
                                onClick={this.handleCheck.bind(this)}
                                onChange={this.controlCheck.bind(this)}
                                label={cbox.Name}
                                inline 
                                >
                                  
                                </Form.Check>
                                
                              // </NavItem>
                            )
                          })}
                          
                        

                        {/* <NavItem eventKey="3" >
                          <Checkbox
                            title="test"
                            name="backend"
                            inline
                            
                            
                           
                            readOnly
                          >
                            PHP / Laravel
                          </Checkbox>
                        </NavItem>  */}
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
                            <h6> Submit</h6>{" "}
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

export default Training;
