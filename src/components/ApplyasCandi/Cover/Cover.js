import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as style from "./Cover.module.css";

class Cover extends  Component {
    render () {
        return (
            <div className={style.gridCoverContainer}>
                <div className={style.gridLeftInfo}>
                    <h1> {this.props.info.Name}</h1>  
                    <p>Join us — and help every create for the web</p> 
                </div>
                <div className={style.gridRightInfo}>
                    <p>We're on a mission to reinvent web, UX, product, and content design — by making it visual</p> 
                    <p> If that sounds good to you, you should apply.
                        (Yes, we are remote-friendly, thanks for asking).
                    </p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        info: state.company.info
    };
};

export default connect(mapStateToProps)( Cover );