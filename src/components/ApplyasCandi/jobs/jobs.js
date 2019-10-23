import React, { Component } from "react";
import axios from "axios";
import HashLoader from 'react-spinners/HashLoader';
import * as style from  "./jobs.module.css";
import Footer from "../footer/footer";
import { Link } from 'react-router-dom';

class Jobs extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      jobs : []
    }
  }

componentDidMount() {
   
  this.setState(prev => ({...prev, isLoading: true }));
  
  axios.get("https://joblaravel.tbv.cloud/jobs", {
    params: {
      cid: 1
    }
  })
  .then(res => {

    let jobs = res.data.filter(job => job.Job_Type !== 5);
    
    this.setState(prev => ({
      ...prev,
      isLoading: false,
      jobs : jobs
    }));
  
  })
  .catch(err => {
    this.setState(prev => ({
      ...prev,
      isLoading: false,
      err,
    }));
  })
}

  
  
  render() {

    let main = (
      <div className={style.sweetLoading}>
        <HashLoader
            sizeUnit={"px"}
            size={50}
            color={'#0C407C'}
            margin="2px"
            loading={this.state.isLoading}
        />
      </div> 
      
    )

    if (!this.state.isLoading) {

      main = this.state.jobs.map((job, index) => (

        <div className={style.jobcardstyle} key={`${index}-${new Date()}`}>
          
          <h4> { job.Name } </h4>          
          
          <h5 >
            { 
              job.Job_Type === 1 ?
                "Full Time": 
                job.Job_Type === 2 ?
                  "Project":
                  job.Job_Type === 3 ?
                    "Part Time":
                      job.Job_Type === 4 ?
                      "Freelance":  null
            }
          </h5>
          
          <Link 
            to={{
              pathname: `/jobs/${job.CID}/${job.id}/job-detail`,
              state: {
                jobType: job.Job_Type 
              }
            }} 
            className={style.detailLink} 
          >
            Details
          </Link>
          
        </div>
      ));
    }

    return (
      
      <section className={style.gridJobsContainer}>

        <header className={style.gridHeader}>

          <div className={style.headCont}>
            
            <h3 className={style.openRoles}>
              Open roles
            </h3>

          </div>
       
        </header>
      
        <main className={style.gridMain}>
         
          <div className={style.flexContainer}>
            { main }
          </div>
        
        </main>
      
        <footer className={style.gridFooter}>
          <Footer />
        </footer>
      </section>   
    );
  }
}

export default Jobs;
