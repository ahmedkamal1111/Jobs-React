import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as style from "./Cover.module.css";

class Cover extends  Component {
    render () {
        return (
            <div className={style.gridCoverContainer}>
                <div className={style.gridLeftInfo}>
                    <h1> {this.props.info.Name}</h1>  
                    <p> { this.props.company_job.jslogan } </p> 
                </div>
                <div className={style.gridRightInfo}>
                    <p> { this.props.company_job.jwelcome } </p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        info: state.company.info,
        company_job: state.company.info.company_job
    };
};

export default connect( mapStateToProps )( Cover );