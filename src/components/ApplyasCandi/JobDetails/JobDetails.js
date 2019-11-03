import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import HashLoader from 'react-spinners/HashLoader';

import * as actions from '../../../store/actions/index';
import * as style from "./JobDetails.module.css";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import Cover from "../Cover/Cover";

class JobDetails extends Component {

  componentDidMount() {   

    const id = this.props.match.params.id; 
    
    if( this.props.CID ) {
      this.props.onFetchJobDetail(this.props.CID, id);
    } else {
      const param = this.props.match.params.anything; 
      const cid = localStorage.getItem('CID');
      this.props.onFetchCompanyInfo(param);
      this.props.onFetchJobs(cid);
      this.props.onFetchJobDetail(cid, id);
    }
  }
  
  render() {

    let companyName = this.props.companyName;

    if (!this.props.companyName) {
      companyName = localStorage.getItem('companyName');
    }
    
    const id  = this.props.match.params.id;

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
      if (this.props.skills.length !== 0 && this.props.respons.length !== 0) {
        main = (
          <React.Fragment>
            <h3>Responsbility</h3>
            <ul> 
              {
                this.props.respons.map((respon, index) => (
                  <li key={`${index-new Date()}`} > { respon } </li>
                ))
              }
            </ul>
            <h3>Skills</h3>
            <ul> 
              {
                this.props.skills.map((skill, index) => (
                  <li key={`${index-new Date()}`} > { skill } </li>
                ))
              }
            </ul>
          </React.Fragment> 
        );
      } else {
        main = (
          <p>Thank you you can apply to your job from the form. </p>
        );
      }
    }
    
    return (
   
      <section className={style.gridDetailsContainer}>

        <div className={style.Navbar} >
          <Navbar />
          <Cover />
        </div>

        <header className={style.gridHeader} >          
          
          <div className={style.headCont} >
            
            <h3>{ this.props.name } <span>( { this.props.jobType } )</span></h3>
            
            <span>At { companyName } </span>
            
            <span>             
              ( <Link to={`/aa/${this.props.param}`} className={style.jobLink}>
                View all jobs               
              </Link> )
            </span>
            
            <p className={style.location}> { this.props.location } </p>    
          </div>
        </header>

        <main className={style.gridMain}>
          <div className={style.mainCont}>

            { main }
            
            <div className={style.applyMainCont}>
              <Link 
                to={{
                  pathname: `/aa/${this.props.param}/jobs/${id}/apply`,
                  state: {
                    jobType: this.props.jobType
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

const mapStateToProps = state => {
  return {
    param: state.company.param,
    CID: state.company.info.cid,
    companyName: state.company.info.Name,
    location: state.jobs.location,
    name: state.jobs.jobName,
    jobType: state.jobs.jobType,
    respons: state.jobs.respons,
    skills: state.jobs.skills,
    isLoading: state.jobs.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return  {
    onFetchJobDetail: (CID, ID) => dispatch(actions.fetchJobDetail(CID, ID)),
    onFetchCompanyInfo: (param) => dispatch(actions.fetchCompanyInfo(param)),
    onFetchJobs: ( CID ) => dispatch(actions.fetchJobs( CID ))
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( JobDetails );