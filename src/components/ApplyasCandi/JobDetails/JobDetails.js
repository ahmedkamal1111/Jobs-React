import React, { Component } from "react";
import * as style from "./JobDetails.module.css";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import Cover from "../Cover/Cover";
import axios from 'axios'; 
import { Link } from "react-router-dom";

class JobDetails extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading : false,
      err: null,
      details: {
        name: "Senior React Developer",
        CID: null,
        CompanyName: "Teqenia",
        jobType: "Full Time",
        location: "Zayed, Giza",
        skills: [],
        respons: [] 
      }    
    }
  }

  componentDidMount() {
    
    const {cid, id} = this.props.match.params;
    
    axios.get(`https://joblaravel.tbv.cloud/job-detail`, {
      params: {
        cid: cid,
        jobId: id
      }
    })
    .then(res => {

      let Respo = res.data.Respo.split("*")
      Respo.shift(Respo[0]);
      
      let skills = res.data.Skills.split("*")
      skills.shift(skills[0]);
      
      this.setState(prev => ({
        ...prev,
        details: {
          ...prev.details,
          CID: res.data.CID,
          jobType: res.data.Job_Type,
          name: res.data.Name,
          skills: skills,
          respons: Respo 
        }
      }))
    })
    .catch(err => {
      this.setState(prev =>({
        ...prev,
        isLoading: false,
        err,
      }))
    })
  }

  renderSkills = () => (
    <ul> 
      {
        this.state.details.skills.map((skill, index) => (
          <li key={`${index-new Date()}`} > { skill } </li>
        ))
      }
    </ul>
  )

  renderRespons = () => (
    <ul> 
      {
        this.state.details.respons.map((respon, index) => (
          <li key={`${index-new Date()}`} > { respon } </li>
        ))
      }
    </ul>
  )
  
  render() {
    
    const {cid, id} = this.props.match.params;
    
    return (
   
      <section className={style.gridDetailsContainer}>

        <div className={style.Navbar} >
          <Navbar />
          <Cover />
        </div>

        <header className={style.gridHeader} >          
          
          <div className={style.headCont} >
            
            <h3>{ this.state.details.name } <span>( { this.state.details.jobType } )</span></h3>
            
            <span>At { this.state.details.CompanyName } </span>
            
            <span>             
              ( <Link to="/" className={style.jobLink}>
                View all jobs               
              </Link> )
            </span>
            
            <p className={style.location}> { this.state.details.location } </p>    
          
          </div>

        </header>

        <main className={style.gridMain}>
          
          <div className={style.mainCont}>
    
            <h3>Responsbility</h3>
            
            { this.renderRespons() }
            
            <h3>Skills</h3>
            { this.renderSkills() }    
            
            <div className={style.applyMainCont}>
              <Link 
                to={{
                  pathname: `/jobs/${cid}/${id}/job-detail/job-form`,
                  state: {
                    jobType: this.state.details.jobType 
                  }
                }} 
                className={style.detailLink}
              >
                Apply Now               
              </Link>
            </div>      

          </div>
        
        </main>
        
        <footer className={style.gridFooter}>
          <Footer />  
        </footer>
      </section>
    );
  }
}

export default JobDetails;