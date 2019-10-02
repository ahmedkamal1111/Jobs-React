import React, { Component } from 'react';
import { Container, ToggleButton, ButtonGroup } from 'react-bootstrap';
import './action.css'
import MyForm from './form';

export default class MakeYourChoice extends Component {

    constructor(props) {
      
        super(props);
      
        this.state = {
            type: '',
        }
        
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        // e.preventDefault();
        this.setState({
            type: e.target.value
        })
    }

    render() {
        
        let action;

        if( this.state.type === "job" ) {
            action = <MyForm Type={this.state.type} />;
        }  else if ( this.state.type === "intern") {
            action =  <MyForm Type={this.state.type} />;
        }

        return (
          
            <main className="content" >
                
                <div className="toolbar"/>
                
                <Container style={{ width: 1300 }}>

                    <div className="d-flex flex-column">
                        
                        <ButtonGroup toggle className="mt-3, c-width" >

                            <ToggleButton type="radio" name="radio" value="job" checked={ this.state.type === 'job' } onChange={ this.handleChange }>
                                Job
                            </ToggleButton>
                            
                            <ToggleButton type="radio" name="radio" value="intern" checked={this.state.type === 'intern'} onChange={this.handleChange}>
                                Internship
                            </ToggleButton>

                        </ButtonGroup>

                    </div>

                    { action }
                    

                </Container>
  
             </main>
           
        );
    }
}