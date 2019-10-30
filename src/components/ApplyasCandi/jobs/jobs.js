import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import * as actions from "../../../store/actions/index";
import HashLoader from 'react-spinners/HashLoader';
import * as style from  "./jobs.module.css";
import Footer from "../footer/footer";

class Jobs extends Component {
  
  componentDidMount() {
    if ( this.props.CID && true ) {
      this.props.onFetchJobs(this.props.CID);  
    }
  };

  render() {

    let main = (
      <div className={style.sweetLoading}>
        <HashLoader
            sizeUnit={"px"}
            size={50}
            color={'#0C407C'}
            margin="2px"
            loading={this.props.isLoading}
        />
      </div> 
    );

    if ( !this.props.isLoading ) {

      main = this.props.jobs.map((job, index) => (

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
              pathname: `/aa/${this.props.param}/jobs/${job.id}`,
              state: {
                jobType: job.Job_Type,
                jobId:  job.id
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

const mapStateToProps = state => {
  return {
    param: state.company.param,
    CID: state.company.info.cid,
    isLoading: state.jobs.isLoading,
    jobs: state.jobs.jobs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchJobs: ( CID ) => dispatch( actions.fetchJobs( CID ) ),
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( Jobs );